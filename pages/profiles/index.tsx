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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Layout from '../../components/UI/Layout';
import { MdLocationSearching } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import FilterMenuCmp from './FilterMenuCmp';
import WorkerCard from './WorkerCard';
import Head from 'next/head';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import LoadingModal from '../../components/UI/LoadingModal';
import AppContext from '../../context/AppContext';
export const FramerButton = motion<ButtonProps>(Button);

const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((e) => {
        console.log(e.coords);
    });
};

const Profiles: NextPage = () => {
    const [user, loading] = useAuthState(auth);
    const ctx = useContext(AppContext);
    const [userCtx, setUserCtx] = useState(ctx.state.user);
    const [searchedUsers, setSearchedUsers] = useState<boolean | Worker[]>(
        false
    );

    useEffect(() => {
        console.log('context in profiles', ctx.state.user);
    },[])

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
                        <Grid
                            w='full'
                            templateColumns={{
                                base: 'repeat(2,1fr)',
                                md: 'repeat(2,1fr)',
                                lg: 'repeat(5,1fr)',
                            }}
                            templateRows={{
                                base: 'repeat(2,1fr)',
                                md: 'repeat(2,1fr)',
                                lg: 'repeat(1,fr)',
                            }}
                            gap={1}>
                            <GridItem w='full'>
                                <Button
                                    w='full'
                                    variant={'primary'}
                                    leftIcon={<MdLocationSearching />}
                                    onClick={getCurrentLocation}
                                    boxShadow={'sm'}>
                                    Get Location
                                </Button>
                            </GridItem>
                            <GridItem w='full'>
                                <FilterMenuCmp />
                            </GridItem>
                            <GridItem colSpan={3} w='full'>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        // eslint-disable-next-line react/no-children-prop
                                        children={
                                            <Search2Icon color='gray.300' />
                                        }
                                    />
                                    <Input
                                        boxShadow={'sm'}
                                        _focus={{
                                            borderColor: 'black',
                                        }}
                                        type='text'
                                        placeholder='Search'
                                    />
                                </InputGroup>
                            </GridItem>
                        </Grid>
                        <Center w='full'>
                            <Container
                                maxW='container.lg'
                                w='full'
                                h='full'
                                paddingTop={4}>
                                <SimpleGrid
                                    columns={{
                                        base: 1,
                                        md: 2,
                                        lg: 3,
                                    }}
                                    spacing={6}>
                                    {/* {workersData.map(
                                        ({
                                            uuid,
                                            fullname,
                                            profileImage,
                                            age,
                                            sex,
                                            expertise,
                                            mobile,
                                            fromTime,
                                            toTime,
                                            address,
                                            location,
                                        }) => {
                                            return (
                                                <WorkerCard
                                                    key={uuid}
                                                    uuid={uuid}
                                                    fullname={fullname}
                                                    profileImage={profileImage}
                                                    age={age}
                                                    sex={sex}
                                                    expertise={expertise}
                                                    mobile={mobile}
                                                    fromTime={fromTime}
                                                    toTime={toTime}
                                                    address={address}
                                                    location={location}
                                                />
                                            );
                                        }
                                    )} */}
                                </SimpleGrid>
                            </Container>
                        </Center>
                    </Layout>
                )}
            </>
        );
    }
};

export default Profiles;
