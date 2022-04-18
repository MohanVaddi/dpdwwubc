import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserData } from '../types/arbeit';
import { auth, firestore } from './firebase';
import axios from 'axios';

export const useUserData = () => {
    const { pathname, push } = useRouter();

    const [user] = useAuthState(auth);

    useEffect(() => {
        let unsubscribe: any;
        if (user) {
            if (pathname === '/') {
                push('/home');
            }
        } else {
            if (pathname === '/home') {
                push('/');
            }
        }
        return unsubscribe;
    }, [user]);

    return { user };
};
