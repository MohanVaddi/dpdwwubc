import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/LandingPage/Header';
import styles from '../styles/Home.module.css';
import services_landing from './../public/LandingPage/services_landing.png';
import {Flex} from '@chakra-ui/react'

const Home: NextPage = () => {
    return (
        <>
            <Header />
            <Flex width='full' height='full'>
            <Image src={services_landing} width='400px' height={'100%'}/>
            </Flex>            
        </>
    );
};

export default Home;
