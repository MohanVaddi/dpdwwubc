import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import Header from '../components/LandingPage/Header';
import styles from '../styles/Home.module.css';
import services_landing from './../public/LandingPage/services_landing.png';
import {
    Container,
    Flex,
    Image,
    Heading,
    HStack,
    VStack,
    Text,
} from '@chakra-ui/react';

const Home: NextPage = () => {
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
                    align='center'>
                    <VStack w='full' h='full'>
                        <Heading size={'lg'}>About Us</Heading>
                        <HStack w='full' h='full' align={'center'}>
                            <VStack w='full' h='full'>
                                <Heading size={'lg'}>Services</Heading>
                                <Text fontSize={'lg'}>
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Reprehenderit, doloremque
                                    rem natus velit distinctio recusandae dolor
                                    aspernatur voluptates minima accusantium,
                                    consequuntur totam porro maiores unde earum
                                    amet consectetur adipisicing elit. Magni
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Temporibus facere impedit
                                    quia blanditiis aut voluptate consequuntur
                                    asperiores minus ipsa accusantium, numquam
                                    alias labore ipsam similique corrupti, fuga
                                    itaque. Enim, cum. amet maiores cum velit
                                    consequuntur doloremque natus reprehenderit
                                    nulla rem recusandae dignissimos ipsum, ad
                                    ullam ea quod adipisci, vitae, inventore
                                    ipsam?
                                </Text>
                            </VStack>
                        </HStack>
                    </VStack>
                </Container>
            </Flex>
        </>
    );
};

export default Home;
