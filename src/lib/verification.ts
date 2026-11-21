import { auth } from './firebase';

/**
 * Email/password accounts must verify their address before personal data is
 * saved (enforced by firestore.rules). Google accounts are always allowed.
 *
 * If the address was verified in another tab, the cached user is refreshed and
 * a fresh ID token is fetched, so the very next write is accepted.
 */
export async function canSavePersonalData(): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;
  const usesPassword = user.providerData.some((p) => p.providerId === 'password');
  if (!usesPassword || user.emailVerified) return true;

  try {
    await user.reload();
    if (auth.currentUser?.emailVerified) {
      await auth.currentUser.getIdToken(true);
      return true;
    }
  } catch (err) {
    console.error('Verification status refresh error:', err);
  }
  return false;
}
