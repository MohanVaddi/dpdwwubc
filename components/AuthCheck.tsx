import React, {
    ReactNode,
    Children,
    useContext,
    useState,
    useEffect,
} from 'react';
import Link from 'next/link';
import { UserContext } from '../context/UserContext';
import Router, { useRouter } from 'next/router';

interface AuthCheckProps {
    children: ReactNode;
    fallback?: any;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children, fallback }) => {
    const { user, username } = useContext(UserContext);

    useEffect(() => {
        if (user && username) {
            Router.push('/home')
        } else {
            Router.push('/')
            
        }
    },[user,username])

    return user && username
        ? children
        : fallback || <Link href={'/'}>Please login</Link>;
};

export default AuthCheck;
