import { User } from 'firebase/auth';
import { createContext } from 'react';
import { UserData } from '../types/arbeit';

interface UserContext {
    user: User | null;
}

const initialState: UserContext = { user: null };

export const UserContext = createContext(initialState);
