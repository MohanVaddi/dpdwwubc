import { getApps, getApp, initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Router, { useRouter } from 'next/router';
const firebaseConfig = {
    apiKey: 'AIzaSyCbukIkp_HrqNa-9LpHp5cNU2_9OGUatvQ',
    authDomain: 'workin-3c1a7.firebaseapp.com',
    projectId: 'workin-3c1a7',
    storageBucket: 'workin-3c1a7.appspot.com',
    messagingSenderId: '644631260052',
    appId: '1:644631260052:web:0f4157a1b5f4442a783d81',
    measurementId: 'G-478WX7VD4M',
};

const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

onAuthStateChanged(auth, async (user: User | null) => {
    const { pathname } = Router;
    if (user) {
        try {
            const userDoc = doc(firestore, `users/${user.uid}`);
            const snapshot = await getDoc(userDoc);
            if (snapshot.exists()) {
                console.log('user already exists');
            } else {
                const batch = writeBatch(firestore);
                batch.set(userDoc, {
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    phoneNumberValidated: false,
                });
                await batch.commit();
            }

            if (pathname === '/') {
                Router.push('/home');
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        if (pathname === '/home') {
            Router.push('/signup');
        }
    }
});

export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
