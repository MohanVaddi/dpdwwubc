import React from 'react';
import { Worker } from '../types/main';

// ! comment should only visible in dev for now
export interface RecentItem {
    type: 'upload' | 'link';
    imageLink: string;
    pdfLink: string;
    date: Date;
}

export interface UserInterface {
    id: string;
    name: string;
    email: string;
    token: string;
    isLoggedIn: boolean;
}

const user: UserInterface = {
    id: '',
    name: '',
    email: '',
    token: '',
    isLoggedIn: false,
};

const initialSearchedWorkersList: Worker[] = [];

const initialState = {
    user,
    searchedWorkers: initialSearchedWorkersList,
};

type AppState = typeof initialState;

type Action =
    | { type: 'SET_USER'; payload: UserInterface }
    | { type: 'SET_LOGGEDIN'; payload: boolean }
    | { type: 'SET_TOKEN'; payload: string }
    | { type: 'SET_SEARCHED_WORKERS'; payload: Worker[] };

const AppContext = React.createContext<{
    state: AppState;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

const reducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'SET_LOGGEDIN':
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: action.payload,
                },
            };
        case 'SET_TOKEN':
            return {
                ...state,
                user: {
                    ...state.user,
                    token: action.payload,
                },
            };
        case 'SET_SEARCHED_WORKERS':
            return {
                ... state
            }
        default:
            return state;
    }
};

export const AppContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
