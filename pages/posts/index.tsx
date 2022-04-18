import { Search2Icon } from '@chakra-ui/icons';
import {
    Button,
    ButtonProps,
    Input,
    InputGroup,
    InputLeftElement,
    Container,
    Grid,
    GridItem,
    Center,
    SimpleGrid,
    Text,
    Spinner,
    Stack,
    Skeleton,
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
export const FramerButton = motion<ButtonProps>(Button);

const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((e) => {
        console.log(e.coords);
    });
};

const Posts: NextPage = () => {
    const [user, loading] = useAuthState(auth);
    const [searchedUsers, setSearchedUsers] = useState<boolean | Worker[]>(
        false
    );
    if (loading) {
        return <LoadingModal />;
    } else {
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
                            {/* <Box
                                w={{ base: '100%', xl: '25%' }}
                                boxShadow='md'
                                padding={10}>
                                <Stack
                                    direction={'column'}
                                    w='full'
                                    spacing={4}>
                                    <Button variant={'primary'}>
                                        Give Work
                                    </Button>
                                    <Button variant={'primary'}>
                                        Find Work
                                    </Button>
                                </Stack>
                            </Box> */}
                            <Box
                                h='full'
                                // width={{ base: '100%', xl: '75%' }}
                                width={{ base: '100%', xl: '100%' }}
                                boxShadow='lg'></Box>
                        </Flex>
                    </Layout>
                )}
            </>
        );
    }
};
export default Posts;
