import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// firestoreDatabaseId is optional: most Firebase projects (including the
// default Spark-plan Firestore database) use the implicit "(default)"
// database, in which case getFirestore(app) is called with no second
// argument. Only pass an explicit database id if one is configured.
const firestoreDatabaseId = (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId;
export const db = firestoreDatabaseId ? getFirestore(app, firestoreDatabaseId) : getFirestore(app);
export const auth = getAuth(app);

// Local end-to-end testing only: `VITE_USE_EMULATORS=true npm run dev` points
// the app at the Firebase Auth + Firestore emulators (see firebase.json), so
// sign-up / quiz flows can be exercised without touching the real project.
// This branch is dev-only and is removed from production builds.
if (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8089);
}
