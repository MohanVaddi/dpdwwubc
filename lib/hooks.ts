import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserData } from '../types/main';
import { auth, firestore } from './firebase';

export const useUserData = () => {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        let unsubscribe: any;
        if (user) {
            const ref = doc(collection(firestore, 'users'), user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
                setUserData(doc.data()?.username);
            });
        } else {
            setUserData(null);
        }
        return unsubscribe;
    }, [user]);

    return { user, userData };
};
