import { Search2Icon } from '@chakra-ui/icons';
import {
    Button,
    ButtonProps,
    Flex,
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { NextPage } from 'next';
import Layout from '../../components/UI/Layout';
import { MdLocationSearching } from 'react-icons/md';
import React, { useContext, useEffect, useRef, useState } from 'react';

import workersData from '../../context/workerData';
import FilterMenuCmp from '../profiles/FilterMenuCmp';
import Head from 'next/head';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import LoadingModal from '../../components/UI/LoadingModal';
import AppContext from '../../context/AppContext';
import ProfileComp from './ProfileComp';
import MakeAPost from './MakeAPost';
export const FramerButton = motion<ButtonProps>(Button);
import { UserInterface, OpenToWork, Posts } from '../../types/arbeit';
import { OpenToWorkComp } from './OpenToWorkComp';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((e) => {
        console.log(e.coords);
    });
};

const Home: NextPage = () => {
    const ctx = useContext(AppContext);

    const [user, loading] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [userFrmCtx, setUserFrmCtx] = useState<UserInterface>(ctx.state.user);

    useEffect(() => {
        if (user) {
            setUserFrmCtx(ctx.state.user);
        }
    }, [user, ctx.state.user]);

    const [searchedUsers, setSearchedUsers] = useState<boolean | Worker[]>(
        false
    );

    if (loading) {
        return (
            <>
                {/* <div id='map'></div> c*/}
                <LoadingModal />
            </>
        );
    } else {
        return (
            <>
                {/* <div id='map'></div> */}

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
                                            <OpenToWorkComp />
                                        </TabPanel>
                                        <TabPanel>
                                            <MakeAPost />
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

export default Home;
