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

  const alice = testEnv.authenticatedContext('alice-uid', { email: 'alice@example.com' });
  const bob = testEnv.authenticatedContext('bob-uid', { email: 'bob@example.com' });
  const anon = testEnv.unauthenticatedContext();

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
