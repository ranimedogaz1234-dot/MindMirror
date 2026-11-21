// Automated Firestore security rules test, run against the local emulator.
// Usage: firebase emulators:exec --only firestore "node test/firestore.rules.test.mjs"
//
// This is a one-off verification script (not part of the app's build/runtime)
// used to confirm per-user data isolation before deploying firestore.rules to
// production. It intentionally has no project dependency footprint beyond the
// temporary, not-saved @firebase/rules-unit-testing devDependency.

import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

let failures = 0;
let passes = 0;

async function check(name, fn) {
  try {
    await fn();
    passes++;
    console.log(`  PASS  ${name}`);
  } catch (err) {
    failures++;
    console.log(`  FAIL  ${name}`);
    console.log(`        ${err.message}`);
  }
}

async function main() {
  const testEnv = await initializeTestEnvironment({
    projectId: 'mindmirror-rules-test',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
      host: 'localhost',
      port: 8089,
    },
  });

  // Tokens mirror what Firebase Authentication issues in production.
  const passwordToken = (email, verified) => ({
    email,
    email_verified: verified,
    firebase: { sign_in_provider: 'password' },
  });
  const alice = testEnv.authenticatedContext('alice-uid', passwordToken('alice@example.com', true));
  const bob = testEnv.authenticatedContext('bob-uid', passwordToken('bob@example.com', true));
  // Email/password account whose address is not verified yet.
  const carol = testEnv.authenticatedContext('carol-uid', passwordToken('carol@example.com', false));
  // Google account (Google always reports a verified email).
  const dave = testEnv.authenticatedContext('dave-uid', {
    email: 'dave@gmail.example',
    email_verified: true,
    firebase: { sign_in_provider: 'google.com' },
  });
  const anon = testEnv.unauthenticatedContext();
  const starterProfile = (uid, email) => ({
    uid,
    email,
    displayName: null,
    photoURL: null,
    streak: 1,
    lastActive: serverTimestamp(),
    traitsProgress: {},
  });

  const aliceProfile = {
    uid: 'alice-uid',
    email: 'alice@example.com',
    displayName: null,
    photoURL: null,
    streak: 1,
    lastActive: serverTimestamp(),
    traitsProgress: {},
  };

  console.log('\nUser profile (users/{userId}) isolation:');

  await check('owner can create their own profile', async () => {
    await assertSucceeds(setDoc(doc(alice.firestore(), 'users', 'alice-uid'), aliceProfile));
  });

  await check('owner can read their own profile', async () => {
    await assertSucceeds(getDoc(doc(alice.firestore(), 'users', 'alice-uid')));
  });

  await check('another signed-in user CANNOT read a different profile', async () => {
    await assertFails(getDoc(doc(bob.firestore(), 'users', 'alice-uid')));
  });

  await check('an unauthenticated user CANNOT read any profile', async () => {
    await assertFails(getDoc(doc(anon.firestore(), 'users', 'alice-uid')));
  });

  await check('another user CANNOT create a profile for someone else', async () => {
    await assertFails(
      setDoc(doc(bob.firestore(), 'users', 'alice-uid'), { ...aliceProfile, uid: 'alice-uid' })
    );
  });

  await check('another user CANNOT overwrite a different profile via update', async () => {
    await assertFails(updateDoc(doc(bob.firestore(), 'users', 'alice-uid'), { streak: 999 }));
  });

  console.log('\nPersonality result fields (mbtiType, mbtiScores, language):');

  const validScores = { E: 28, I: 72, S: 40, N: 60, T: 80, F: 20, J: 33, P: 67 };

  await check('owner can save a type, preference scores and language', async () => {
    await assertSucceeds(
      updateDoc(doc(alice.firestore(), 'users', 'alice-uid'), {
        mbtiType: 'INTJ',
        mbtiScores: validScores,
        language: 'ar',
        lastActive: serverTimestamp(),
      })
    );
  });

  await check('another user CANNOT write results into a different profile', async () => {
    await assertFails(
      updateDoc(doc(bob.firestore(), 'users', 'alice-uid'), {
        mbtiType: 'ENFP',
        mbtiScores: validScores,
        language: 'en',
        lastActive: serverTimestamp(),
      })
    );
  });

  await check('a percentage outside 0-100 is rejected', async () => {
    await assertFails(
      updateDoc(doc(alice.firestore(), 'users', 'alice-uid'), {
        mbtiScores: { ...validScores, E: 140 },
        lastActive: serverTimestamp(),
      })
    );
  });

  await check('a non-numeric percentage is rejected', async () => {
    await assertFails(
      updateDoc(doc(alice.firestore(), 'users', 'alice-uid'), {
        mbtiScores: { ...validScores, I: 'high' },
        lastActive: serverTimestamp(),
      })
    );
  });

  await check('an unexpected key inside mbtiScores is rejected', async () => {
    await assertFails(
      updateDoc(doc(alice.firestore(), 'users', 'alice-uid'), {
        mbtiScores: { ...validScores, X: 50 },
        lastActive: serverTimestamp(),
      })
    );
  });

  await check('an incomplete mbtiScores map is rejected', async () => {
    await assertFails(
      updateDoc(doc(alice.firestore(), 'users', 'alice-uid'), {
        mbtiScores: { E: 28, I: 72 },
        lastActive: serverTimestamp(),
      })
    );
  });

  await check('an unsupported language code is rejected', async () => {
    await assertFails(
      updateDoc(doc(alice.firestore(), 'users', 'alice-uid'), {
        language: 'de',
        lastActive: serverTimestamp(),
      })
    );
  });

  await check('an undeclared profile field is still rejected', async () => {
    await assertFails(
      updateDoc(doc(alice.firestore(), 'users', 'alice-uid'), {
        isAdmin: true,
        lastActive: serverTimestamp(),
      })
    );
  });

  console.log('\nQuiz results (results/{resultId}) isolation:');

  await check('owner can create their own quiz result', async () => {
    await assertSucceeds(
      addDoc(collection(alice.firestore(), 'results'), {
        userId: 'alice-uid',
        traitId: 'openness',
        score: 80,
        percentage: 80,
        timestamp: serverTimestamp(),
      })
    );
  });

  await check('a user CANNOT create a quiz result for someone else', async () => {
    await assertFails(
      addDoc(collection(bob.firestore(), 'results'), {
        userId: 'alice-uid',
        traitId: 'openness',
        score: 80,
        percentage: 80,
        timestamp: serverTimestamp(),
      })
    );
  });

  await check("a user's results query only returns their own docs (rule-enforced)", async () => {
    const q = query(collection(bob.firestore(), 'results'), where('userId', '==', 'alice-uid'));
    await assertFails(getDocs(q));
  });

  console.log('\nDaily moods (daily_moods/{moodId}) isolation:');

  await check('owner can log their own mood', async () => {
    await assertSucceeds(
      addDoc(collection(alice.firestore(), 'daily_moods'), {
        userId: 'alice-uid',
        moodType: 'Calm',
        moodEmoji: '😌',
        moodPercentage: 70,
        answers: { m1: 70 },
        timestamp: serverTimestamp(),
      })
    );
  });

  await check('a user CANNOT log a mood entry for someone else', async () => {
    await assertFails(
      addDoc(collection(bob.firestore(), 'daily_moods'), {
        userId: 'alice-uid',
        moodType: 'Calm',
        moodEmoji: '😌',
        moodPercentage: 70,
        answers: { m1: 70 },
        timestamp: serverTimestamp(),
      })
    );
  });

  console.log('\nStricter field validation:');

  const result = (extra = {}) => ({
    userId: 'alice-uid',
    traitId: 'openness',
    score: 66.5,
    percentage: 67,
    timestamp: serverTimestamp(),
    ...extra,
  });
  const mood = (extra = {}) => ({
    userId: 'alice-uid',
    moodType: 'Calm',
    moodEmoji: '😌',
    moodPercentage: 67,
    answers: { m1: 100, m2: 33.33333333333333, m3: 66.66666666666666, m4: 0, m5: 100, m6: 100 },
    timestamp: serverTimestamp(),
    ...extra,
  });
  const aliceRef = () => doc(alice.firestore(), 'users', 'alice-uid');

  await check('a quiz updates one trait in traitsProgress (as QuizScreen does)', async () => {
    await assertSucceeds(updateDoc(aliceRef(), { 'traitsProgress.openness': 67, lastActive: serverTimestamp() }));
  });
  await check('an unknown trait id in traitsProgress is rejected', async () => {
    await assertFails(updateDoc(aliceRef(), { 'traitsProgress.hacking': 50, lastActive: serverTimestamp() }));
  });
  await check('a traitsProgress value above 100 is rejected', async () => {
    await assertFails(updateDoc(aliceRef(), { 'traitsProgress.empathy': 150, lastActive: serverTimestamp() }));
  });
  await check('a non-integer streak or an absurd streak is rejected', async () => {
    await assertFails(updateDoc(aliceRef(), { streak: 1.5, lastActive: serverTimestamp() }));
    await assertFails(updateDoc(aliceRef(), { streak: 999999999, lastActive: serverTimestamp() }));
  });
  await check('an invalid personality type code is rejected', async () => {
    await assertFails(updateDoc(aliceRef(), { mbtiType: 'ABCD', lastActive: serverTimestamp() }));
  });
  await check('a profile update with a client-supplied lastActive is rejected', async () => {
    await assertFails(updateDoc(aliceRef(), { language: 'fr', lastActive: new Date() }));
  });
  await check('the email address cannot be changed', async () => {
    await assertFails(updateDoc(aliceRef(), { email: 'other@example.com', lastActive: serverTimestamp() }));
  });
  await check('a starter profile with a spoofed email is rejected', async () => {
    await assertFails(setDoc(doc(bob.firestore(), 'users', 'bob-uid'), starterProfile('bob-uid', 'alice@example.com')));
  });
  await check('a starter profile that pre-fills results or streak is rejected', async () => {
    await assertFails(setDoc(doc(bob.firestore(), 'users', 'bob-uid'), { ...starterProfile('bob-uid', 'bob@example.com'), mbtiType: 'INTJ' }));
    await assertFails(setDoc(doc(bob.firestore(), 'users', 'bob-uid'), { ...starterProfile('bob-uid', 'bob@example.com'), streak: 500 }));
    await assertFails(setDoc(doc(bob.firestore(), 'users', 'bob-uid'), { ...starterProfile('bob-uid', 'bob@example.com'), traitsProgress: { openness: 90 } }));
  });

  await check('a quiz result with a fractional score is accepted', async () => {
    await assertSucceeds(addDoc(collection(alice.firestore(), 'results'), result()));
  });
  await check('a quiz result with an extra field is rejected', async () => {
    await assertFails(addDoc(collection(alice.firestore(), 'results'), result({ note: 'x'.repeat(5000) })));
  });
  await check('a quiz result with an unknown trait id is rejected', async () => {
    await assertFails(addDoc(collection(alice.firestore(), 'results'), result({ traitId: 'hacking' })));
  });
  await check('a quiz result with an out-of-range score or percentage is rejected', async () => {
    await assertFails(addDoc(collection(alice.firestore(), 'results'), result({ score: 500 })));
    await assertFails(addDoc(collection(alice.firestore(), 'results'), result({ percentage: -1 })));
    await assertFails(addDoc(collection(alice.firestore(), 'results'), result({ percentage: 67.5 })));
  });
  await check('a quiz result with a client-supplied timestamp is rejected', async () => {
    await assertFails(addDoc(collection(alice.firestore(), 'results'), result({ timestamp: new Date() })));
  });
  await check('quiz results cannot be edited or deleted afterwards', async () => {
    const ref = await addDoc(collection(alice.firestore(), 'results'), result());
    await assertFails(updateDoc(ref, { percentage: 100 }));
    await assertFails(deleteDoc(ref));
  });
  await check("the dashboard's results query (userId + newest first) is allowed for the owner", async () => {
    const q = query(collection(alice.firestore(), 'results'), where('userId', '==', 'alice-uid'), orderBy('timestamp', 'desc'));
    await assertSucceeds(getDocs(q));
  });
  await check("the analytics' moods query (userId + newest first) is allowed for the owner", async () => {
    const q = query(collection(alice.firestore(), 'daily_moods'), where('userId', '==', 'alice-uid'), orderBy('timestamp', 'desc'));
    await assertSucceeds(getDocs(q));
  });

  await check('a real mood entry (fractional answers) is accepted', async () => {
    await assertSucceeds(addDoc(collection(alice.firestore(), 'daily_moods'), mood()));
  });
  await check('a mood entry with an unknown mood type is rejected', async () => {
    await assertFails(addDoc(collection(alice.firestore(), 'daily_moods'), mood({ moodType: 'Hacked' })));
  });
  await check('mood answers with unknown keys or out-of-range values are rejected', async () => {
    await assertFails(addDoc(collection(alice.firestore(), 'daily_moods'), mood({ answers: { m1: 50, junk: 1 } })));
    await assertFails(addDoc(collection(alice.firestore(), 'daily_moods'), mood({ answers: { m1: 1000 } })));
  });
  await check('a mood entry with an extra field or a percentage above 100 is rejected', async () => {
    await assertFails(addDoc(collection(alice.firestore(), 'daily_moods'), mood({ extra: true })));
    await assertFails(addDoc(collection(alice.firestore(), 'daily_moods'), mood({ moodPercentage: 150 })));
  });

  console.log('\nEmail verification (email/password accounts):');

  const carolRef = () => doc(carol.firestore(), 'users', 'carol-uid');

  await check('an unverified account can create its starter profile (sign-up keeps working)', async () => {
    await assertSucceeds(setDoc(carolRef(), starterProfile('carol-uid', 'carol@example.com')));
  });
  await check('an unverified account can read its own profile', async () => {
    await assertSucceeds(getDoc(carolRef()));
  });
  await check('an unverified account can load its (empty) results and moods', async () => {
    await assertSucceeds(getDocs(query(collection(carol.firestore(), 'results'), where('userId', '==', 'carol-uid'))));
    await assertSucceeds(getDocs(query(collection(carol.firestore(), 'daily_moods'), where('userId', '==', 'carol-uid'))));
  });
  await check('an unverified account CANNOT save a personality type', async () => {
    await assertFails(updateDoc(carolRef(), { mbtiType: 'INTJ', mbtiScores: validScores, language: 'en', lastActive: serverTimestamp() }));
  });
  await check('an unverified account CANNOT save quiz progress or a quiz result', async () => {
    await assertFails(updateDoc(carolRef(), { 'traitsProgress.openness': 67, lastActive: serverTimestamp() }));
    await assertFails(addDoc(collection(carol.firestore(), 'results'), result({ userId: 'carol-uid' })));
  });
  await check('an unverified account CANNOT log a mood', async () => {
    await assertFails(addDoc(collection(carol.firestore(), 'daily_moods'), mood({ userId: 'carol-uid' })));
  });

  console.log('\nGoogle Sign-In accounts:');

  const daveRef = () => doc(dave.firestore(), 'users', 'dave-uid');

  await check('a Google account can create its profile and save every kind of result', async () => {
    await assertSucceeds(setDoc(daveRef(), starterProfile('dave-uid', 'dave@gmail.example')));
    await assertSucceeds(updateDoc(daveRef(), { mbtiType: 'ENFP', mbtiScores: validScores, language: 'fr', lastActive: serverTimestamp() }));
    await assertSucceeds(updateDoc(daveRef(), { 'traitsProgress.empathy': 100, lastActive: serverTimestamp() }));
    await assertSucceeds(addDoc(collection(dave.firestore(), 'results'), result({ userId: 'dave-uid', traitId: 'empathy' })));
    await assertSucceeds(addDoc(collection(dave.firestore(), 'daily_moods'), mood({ userId: 'dave-uid' })));
  });
  await check("a Google account CANNOT read another user's data", async () => {
    await assertFails(getDoc(doc(dave.firestore(), 'users', 'alice-uid')));
    await assertFails(getDocs(query(collection(dave.firestore(), 'results'), where('userId', '==', 'alice-uid'))));
    await assertFails(getDocs(query(collection(dave.firestore(), 'daily_moods'), where('userId', '==', 'alice-uid'))));
  });

  console.log('\nDefault-deny fallback:');

  await check('an undeclared collection is denied entirely', async () => {
    await assertFails(getDoc(doc(alice.firestore(), 'secrets', 'anything')));
  });

  await testEnv.cleanup();

  console.log(`\n${passes} passed, ${failures} failed\n`);
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Test runner crashed:', err);
  process.exit(1);
});
