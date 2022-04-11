import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import Header from '../components/LandingPage/Header';
import styles from '../styles/Home.module.css';
import services_landing from './../public/LandingPage/services_landing.png';
import { auth, googleAuthProvider } from '../lib/firebase';

import {
    Container,
    Flex,
    Image,
    Heading,
    HStack,
    VStack,
    Text,
    Button,
    useToast,
} from '@chakra-ui/react';
import { signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadingModal from '../components/UI/LoadingModal';

const Home: NextPage = () => {
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return <LoadingModal />;
    } else {
        return (
            <>
                <Head>
                    <title>DPDWWUB</title>
                    <meta
                        name='viewport'
                        content='initial-scale=1.0, width=device-width'
                    />
                </Head>
                <Header />

                <Flex flexDirection={'column'}>
                    <Container
                        maxW={{
                            base: 'full',
                            lg: 'container.xl',
                        }}
                        w='full'
                        h='full'
                        align='center'></Container>
                </Flex>
            </>
        );
    }
};

export default Home;
