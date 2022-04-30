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
import WorkerCard from './ProfileCard';
import Head from 'next/head';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import LoadingModal from '../../components/UI/LoadingModal';
import AppContext from '../../context/AppContext';
import axios, { AxiosResponse } from 'axios';
import { OpenToWork, UserInterface } from '../../types/arbeit';
import { backend_uri } from '../../lib/isDevEnvironment';
import ProfileCard from './ProfileCard';
export const FramerButton = motion<ButtonProps>(Button);

const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((e) => {
        console.log(e.coords);
    });
};

interface ProfilesPageProps {
    children?: React.ReactNode;
    profiles: OpenToWork[];
}

const Profiles: NextPage<ProfilesPageProps> = (props) => {
    const [user, loading] = useAuthState(auth);
    const ctx = useContext(AppContext);
    const [userFrmCtx, setUserFrmCtx] = useState<UserInterface>(ctx.state.user);

    useEffect(() => {
        if (user) {
            setUserFrmCtx(ctx.state.user);
        }
    }, [user, ctx.state.user]);

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
                                    {props.profiles.map((profile, idx) => {
                                        return (
                                            <ProfileCard
                                                key={idx}
                                                profile={profile}
                                            />
                                        );
                                    })}
                                </SimpleGrid>
                            </Container>
                        </Center>
                    </Layout>
                )}
            </>
        );
    }
};

export async function getStaticProps() {
    const response: AxiosResponse<OpenToWork[]> = await axios.get(
        `${backend_uri}/profiles`
    );

    const profiles = response.data;

    // const markerPoints = profiles.map((post) => {
    //     return {
    //         lat: parseInt(post.location.split(' ')[0] as string),
    //         lng: parseInt(post.location.split(' ')[1] as string),
    //     };
    // });

    return {
        props: {
            profiles,
            // markerPoints,
        },
        revalidate: 10,
    };
}

export default Profiles;
