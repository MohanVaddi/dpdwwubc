import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserData } from '../types/main';
import { auth, firestore } from './firebase';

export const useUserData = () => {
    const { pathname, push } = useRouter();

    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const getData = async () => {
            const userDoc = doc(firestore, `users/${user!.uid}`);
            const snapshot = await getDoc(userDoc);
            console.log(snapshot.data());
            return snapshot.data();
        };

        let unsubscribe: any;
        if (user) {
            console.log(getData());
            if (pathname === '/') {
                push('/home');
            }
        } else {
            if (pathname === '/home') {
                push('/');
            }
            setUserData(null);
        }
        return unsubscribe;
    }, [user]);

    return { user, userData };
};
