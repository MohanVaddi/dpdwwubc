import React from 'react';
import { UserInterface } from '../types/arbeit';

export interface User extends UserInterface {}

export interface LatLngLiteral {
    lat: number;
    lng: number;
}

export const initialLoc: LatLngLiteral = {
    lat: 0,
    lng: 0,
};

export interface LocContextInterface {
    location: LatLngLiteral;
    markerPoints: LatLngLiteral[];
}

const initialState: LocContextInterface = {
    location: initialLoc,
    markerPoints: [],
};

type AppState = typeof initialState;

type Action =
    | { type: 'SET_LOCATION'; payload: LatLngLiteral }
    | { type: 'SET_MARKERPOINTS'; payload: LatLngLiteral[] };

const LocContext = React.createContext<{
    state: AppState;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

const reducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case 'SET_LOCATION':
            return {
                ...state,
                location: {
                    lat: action.payload.lat,
                    lng: action.payload.lng,
                },
            };
        case 'SET_MARKERPOINTS':
            return {
                ...state,
                markerPoints: [...action.payload],
            };
        default:
            return state;
    }
};

export const LocContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <LocContext.Provider value={{ state, dispatch }}>
            {children}
        </LocContext.Provider>
    );
};

export default LocContext;
