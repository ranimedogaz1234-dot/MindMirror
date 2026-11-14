import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, onSnapshot, orderBy } from 'firebase/firestore';
import { Trait, Quiz, QuizResult, MBTIType, MoodEntry } from '../types';
import { useAuth } from './AuthProvider';
import { handleFirestoreError, OperationType } from '../lib/utils';

interface DataContextType {
  results: QuizResult[];
  mbtiTypes: MBTIType[];
  moods: MoodEntry[];
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [mbtiTypes, setMbtiTypes] = useState<MBTIType[]>([]);
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setResults([]);
      setLoading(false);
      return;
    }

    const resultsRef = collection(db, 'results');
    const q = query(resultsRef, where('userId', '==', user.uid), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as QuizResult));
      setResults(docs);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'results');
    });

    const moodsRef = collection(db, 'daily_moods');
    const mq = query(moodsRef, where('userId', '==', user.uid), orderBy('timestamp', 'desc'));
    const unsubscribeMoods = onSnapshot(mq, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MoodEntry));
      setMoods(docs);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'daily_moods');
    });

    return () => {
      unsubscribe();
      unsubscribeMoods();
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchMbti = async () => {
      try {
        const q = query(collection(db, 'personality_types'));
        const snap = await getDocs(q);
        setMbtiTypes(snap.docs.map(d => d.data() as MBTIType));
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'personality_types');
      }
    };
    fetchMbti();
  }, [user]);

  return (
    <DataContext.Provider value={{ results, mbtiTypes, moods, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
