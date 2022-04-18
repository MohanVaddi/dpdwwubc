import { Search2Icon } from '@chakra-ui/icons';
import {
    Button,
    ButtonProps,
    InputGroup,
    InputLeftElement,
    Container,
    Grid,
    Center,
    SimpleGrid,
    Text,
    Flex,
    Box,
    HStack,
    ButtonGroup,
    VStack,
    Tabs,
    TabList,
    useColorModeValue,
    Tab,
    TabPanels,
    TabPanel,
    Image,
    Table,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { NextPage } from 'next';
import Layout from '../../components/UI/Layout';
import { MdLocationSearching } from 'react-icons/md';
import React, { useContext, useEffect, useState } from 'react';
import { Worker } from '../../types/arbeit';
import workersData from '../../context/workerData';
import FilterMenuCmp from '../profiles/FilterMenuCmp';
import Head from 'next/head';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import LoadingModal from '../../components/UI/LoadingModal';
import AppContext from '../../context/AppContext';
import OpenToWorkModal  from './OpenToWorkModal';
import  ProfileComp  from './ProfileComp';
export const FramerButton = motion<ButtonProps>(Button);

const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((e) => {
        console.log(e.coords);
    });
};

export interface UserInterface {
    userId: string;
    username: string;
    mobile?: string;
    email: string;
    photoURL?: string;
    isMobileVerified?: boolean;
    openToWork?: OpenToWork;
    posts?: Posts[];
}

export interface OpenToWork {
    userId: string;
    username: string;
    mobile: string;
    email: string;
    photoURL?: string;
    phoneNumberVerified: boolean;
    location: string;
    expertise: string;
}

export interface Posts {
    userId: string;
    username: string;
    mobile: string;
    email: string;
    photoURL?: string;
    title: string;
    description: string;
    phoneNumberVerified: boolean;
    location: string;
    expertiseNeeded: string;
}

const Home: NextPage = () => {
    const ctx = useContext(AppContext);
    const [user, loading] = useAuthState(auth);

    const [userFrmCtx, setUserFrmCtx] = useState<UserInterface>();

    useEffect(() => {
        setUserFrmCtx(ctx.state.user);
    }, [ctx]);

    useEffect(() => {
        ctx.dispatch({
            type: 'SET_USER',
            payload: {
                userId: user?.uid.toString() as string,
                username: user?.displayName as string,
                photoURL: user?.photoURL as string,
                email: user?.email as string,
            },
        });
    }, [loading]);

    const [searchedUsers, setSearchedUsers] = useState<boolean | Worker[]>(
        false
    );
    console.log(user?.email);
    if (loading) {
        return <LoadingModal />;
    } else {
        console.log('user data at home', user);
        return (
            <>
                {user && (
                    <Layout>
                        <Head>
                            <title>Home</title>
                            <meta
                                name='viewport'
                                content='initial-scale=1.0, width=device-width'
                            />
                        </Head>
                        <Flex
                            h='full'
                            flexDirection={{ base: 'column', xl: 'row' }}
                            gap={10}>
                            <Box
                                h='full'
                                width={{ base: '100%', xl: '100%' }}
                                boxShadow='lg'>
                                <Tabs
                                    size='lg'
                                    lazyBehavior='keepMounted'
                                    isLazy={true}>
                                    <TabList>
                                        <Tab>Profile</Tab>
                                        <Tab>Open To Work</Tab>
                                        <Tab>Posts</Tab>
                                    </TabList>
                                    <TabPanels p='2rem'>
                                        <TabPanel>
                                            <ProfileComp
                                                user={
                                                    userFrmCtx as UserInterface
                                                }
                                            />
                                        </TabPanel>
                                        <TabPanel>
                                            <OpenToWork
                                                openToWork={
                                                    userFrmCtx?.openToWork as OpenToWork
                                                }
                                            />
                                        </TabPanel>
                                        <TabPanel>
                                            <Text>
                                                Here goes the user posts
                                            </Text>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Box>
                        </Flex>
                    </Layout>
                )}
            </>
        );
    }
};

const OpenToWork: React.FC<Required<Pick<UserInterface, 'openToWork'>>> = ({
    openToWork,
}) => {
    console.log(openToWork);
    if (openToWork) {
        return (
            <Flex w='full' h='full'>
                <SimpleGrid
                    h='full'
                    w='full'
                    columns={[1, 1, 2]}
                    gap={[6, 6, 0, 0]}
                    spacing={6}>
                    <Center w='full' h='full'>
                        <Image
                            w='200px'
                            h='200px'
                            alt={'profile picture'}
                            referrerPolicy='no-referrer'
                            src={openToWork.photoURL as string}
                            rounded='full'
                        />
                    </Center>
                    <VStack
                        w='full'
                        h='full'
                        textAlign={{
                            base: 'center',
                            sm: 'center',
                            md: 'left',
                        }}>
                        <Text
                            fontSize={'3xl'}
                            fontWeight='900'
                            color='primary.500'
                            w='full'>
                            {openToWork?.username}
                        </Text>
                        <Text fontWeight='500' fontSize={'md'} w='full'>
                            {openToWork?.email}
                        </Text>
                        {openToWork && openToWork.phoneNumberVerified ? (
                            <Text fontWeight='500' fontSize={'sm'} w='full'>
                                {openToWork.mobile}
                            </Text>
                        ) : (
                            <Text fontSize={'sm'} color='gray.500' w='full'>
                                Phone Number not verified
                            </Text>
                        )}
                    </VStack>
                </SimpleGrid>
            </Flex>
        );
    } else {
        return (
            <VStack w='full' h='full'>
                <Text fontSize={'lg'}>
                    You haven&apos;t set your Open to Work.
                </Text>
                <OpenToWorkModal />
            </VStack>
        );
    }
};

export default Home;
