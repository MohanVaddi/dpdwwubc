import axios, { AxiosResponse } from 'axios';
import { getApps, getApp, initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { UserInterface } from '../types/arbeit';
import { backend_uri } from './isDevEnvironment';
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
    if (user) {
        try {
            const userDoc = doc(firestore, `users/${user.uid}`);
            const snapshot = await getDoc(userDoc);
            if (snapshot.exists()) {
                console.log('user already exists');
            } else {
                console.log('new user');
                const batch = writeBatch(firestore);
                batch.set(userDoc, {
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    isMobileVerified: false,
                    userSavedToDB: true,
                });
                await batch.commit();
            }
        } catch (err) {
            console.error(err);
        } finally {
            try {
                const isUserExists = await axios.get(`${backend_uri}/user`, {
                    headers: {
                        'x-user-id': user.uid,
                    },
                });

                console.log('is User Exists', isUserExists);

                if (isUserExists.data.length === 0) {
                    const response: AxiosResponse<UserInterface> =
                        await axios.post(`${backend_uri}/user`, {
                            userId: user.uid,
                            username: user.displayName,
                            isMobileVerified: false,
                            photoURL: user.photoURL,
                            email: user.email,
                        });
                    console.log('server returns ', response.data);
                } else {
                    console.log('user already exists in db');
                }
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        console.log("could't login");
    }
});

export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
