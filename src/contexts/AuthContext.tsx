import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  businessId: string | null;
  isPro: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      setUser(firebaseUser);
      if (!firebaseUser) {
        setBusinessId(null);
        setIsPro(false);
        setLoading(false);
        return;
      }

      // Ensure user doc exists
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        const newBusinessId = `biz_${firebaseUser.uid.slice(0, 8)}`;
        await setDoc(doc(db, 'businesses', newBusinessId), {
          name: 'Meu Mercado Flow',
          ownerId: firebaseUser.uid,
          createdAt: new Date().toISOString()
        });
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          businessId: newBusinessId,
          role: 'admin',
          isPro: false,
          createdAt: new Date().toISOString()
        });
      }

      // Set up real-time listener
      unsubscribeSnapshot = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setBusinessId(data.businessId);
          
          const isProActive = !!data.isPro;
          const proUntil = data.proUntil ? new Date(data.proUntil) : null;
          const isNotExpired = proUntil ? proUntil > new Date() : false;
          
          setIsPro(isProActive || isNotExpired);
        }
        setLoading(false);
      });
    });

    return () => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      unsubscribeAuth();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, businessId, isPro, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, logout }}>
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
