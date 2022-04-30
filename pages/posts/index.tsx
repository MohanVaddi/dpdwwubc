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
import React, { useContext, useEffect, useRef, useState } from 'react';
import FilterMenuCmp from '../profiles/FilterMenuCmp';
import Head from 'next/head';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import LoadingModal from '../../components/UI/LoadingModal';
import { async } from '@firebase/util';
import axios, { AxiosResponse } from 'axios';
import { backend_uri } from '../../lib/isDevEnvironment';
import { LatLngLiteral, Posts, UserInterface } from '../../types/arbeit';
import AppContext from '../../context/AppContext';
// import Map from '../../components/Map';
import dynamic from 'next/dynamic';
import LocContext from '../../context/LocContext';
import Mapbox from 'react-map-gl/dist/esm/mapbox/mapbox';
import { MapboxMap } from 'react-map-gl';
const FramerButton = motion<ButtonProps>(Button);

import MapBox from '../../components/MapBox';
import { PostComp } from '../home/MakeAPost';

interface PostPageProps {
    children?: React.ReactNode;

    posts: Posts[];
    markerPoints: LatLngLiteral[];
}

// function DynamicMap() {
//     const Map = React.useMemo(
//         () =>
//             dynamic(
//                 // @ts-ignore
//                 () => import('../../components/Map'), // replace '@components/map' with your component's location
//                 {
//                     loading: () => <p>map is loading</p>,
//                     ssr: false, // This line is important. It's what prevents server-side render
//                 }
//             ),
//         [
//             /* list variables which should trigger a re-render here */
//         ]
//     );
//     return <Map />;
// }

const Posts: NextPage<PostPageProps> = (props) => {
    const ctx = useContext(AppContext);

    const locCtx = useRef(useContext(LocContext));

    const [user, loading] = useAuthState(auth);

    const [userFrmCtx, setUserFrmCtx] = useState<UserInterface>(ctx.state.user);

    useEffect(() => {
        if (user) {
            setUserFrmCtx(ctx.state.user);
        }
    }, [user, ctx.state.user]);

    useEffect(() => {
        locCtx.current.dispatch({
            type: 'SET_MARKERPOINTS',
            payload: props.markerPoints,
        });
    }, [props.markerPoints]);

    if (loading) {
        return (
            <>
                <LoadingModal />
            </>
        );
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
                        {/* {<DynamicMap />} */}
                        <MapBox />
                        <SimpleGrid
                            w='full'
                            columns={[1, 1, 2]}
                            spacing={[2, 6]}
                            mt={10}>
                            {props.posts.map((post, idx) => {
                                return <PostComp key={idx} post={post} />;
                            })}
                        </SimpleGrid>
                    </Layout>
                )}
            </>
        );
    }
};

export async function getStaticProps() {
    const response: AxiosResponse<Posts[]> = await axios.get(
        `${backend_uri}/posts`
    );

    const posts = response.data;

    const markerPoints = posts.map((post) => {
        return {
            lat: parseInt(post.location.split(' ')[0] as string),
            lng: parseInt(post.location.split(' ')[1] as string),
        };
    });

    return {
        props: {
            posts,
            markerPoints,
        },
        revalidate: 10,
    };
}

export default Posts;
