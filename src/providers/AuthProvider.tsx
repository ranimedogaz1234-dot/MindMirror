import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { UserProfile } from '../types';
import { getAuthErrorMessage } from '../lib/utils';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<boolean>;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  resendVerificationEmail: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Stop listening to the previous account's profile before anything else.
      unsubscribeProfile?.();
      unsubscribeProfile = null;

      setUser(user);
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      // Sync user profile
      const profileRef = doc(db, 'users', user.uid);
      try {
        const snap = await getDoc(profileRef);
        if (!snap.exists()) {
          const newProfile: any = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            streak: 1,
            lastActive: serverTimestamp(),
            traitsProgress: {} as any,
          };
          await setDoc(profileRef, newProfile);
          setProfile(newProfile);
        } else {
          setProfile(snap.data() as UserProfile);
        }

        // Real-time sync for the profile (new and existing accounts alike).
        if (auth.currentUser?.uid === user.uid) {
          unsubscribeProfile = onSnapshot(
            profileRef,
            (doc) => {
              if (doc.exists()) setProfile(doc.data() as UserProfile);
            },
            (err) => console.error('Profile listener error:', err)
          );
        }
      } catch (err) {
        // Never leave the app stuck on the splash screen if the profile
        // cannot be read or created; surface the problem instead.
        console.error('Profile sync error:', err);
        toast.error('Could not load your profile. Please try again.');
      } finally {
        setLoading(false);
      }
    });

    return () => {
      unsubscribeProfile?.();
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Google Sign-in Error:', err);
      const message = getAuthErrorMessage(err);
      if (message) toast.error(message);
    }
  };

  /** Creates a new account and sends a verification email. Returns true on success. */
  const signUpWithEmail = async (email: string, password: string): Promise<boolean> => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await sendEmailVerification(cred.user);
        toast.success('Account created! Check your inbox to verify your email.');
      } catch (verifyErr) {
        console.error('Send Verification Email Error:', verifyErr);
        toast.success('Account created!');
      }
      return true;
    } catch (err: any) {
      console.error('Email Sign-up Error:', err);
      toast.error(getAuthErrorMessage(err));
      return false;
    }
  };

  /** Signs in with email/password. Returns true on success. */
  const signInWithEmail = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err: any) {
      console.error('Email Sign-in Error:', err);
      toast.error(getAuthErrorMessage(err));
      return false;
    }
  };

  /** Sends a password-reset email. Returns true on success. */
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent. Check your inbox.');
      return true;
    } catch (err: any) {
      console.error('Password Reset Error:', err);
      toast.error(getAuthErrorMessage(err));
      return false;
    }
  };

  /** Resends the email-verification link to the currently signed-in user. */
  const resendVerificationEmail = async () => {
    if (!auth.currentUser) return;
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success('Verification email sent.');
    } catch (err: any) {
      console.error('Resend Verification Error:', err);
      toast.error(getAuthErrorMessage(err));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Logout Error:', err);
      toast.error(getAuthErrorMessage(err));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        resetPassword,
        resendVerificationEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
