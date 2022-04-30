import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

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
            } else if (pathname === '/posts') {
                push('/');
            } else if (pathname === '/profiles') {
                push('/');
            }
        }
        return unsubscribe;
    }, [user]);

    return { user };
};

// AIzaSyA_H3jsaudbNEEfNBrZvzvgn8GeAN9Rveg
