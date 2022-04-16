import { User } from 'firebase/auth';
import { createContext } from 'react';
import { UserData } from '../types/arbeit';

interface UserContext {
    user: User | null;
    userData: UserData | null;
}

const initialState: UserContext = { user: null, userData: null };

export const UserContext = createContext(initialState);
