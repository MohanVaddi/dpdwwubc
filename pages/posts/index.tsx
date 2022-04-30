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
const FramerButton = motion<ButtonProps>(Button);

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
//@ts-ignore
// import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken =
    'pk.eyJ1IjoibW9oYW5rZW5vYmkiLCJhIjoiY2wybGV6NDVmMGNwNjNqbmsyczIwOW1nYiJ9.PuddGS4XNYZXHDDeskldpg';

const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((e) => {
        console.log(e.coords);
    });
};

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

    const [pageIsMounted, setPageIsMounted] = useState(false);

    const map = useRef<any>(null);

    const locCtx = useContext(LocContext);
    const [lat, setLat] = useState(locCtx.state.location.lat);
    const [lng, setLng] = useState(locCtx.state.location.lng);
    const [zoom, setZoom] = useState(5);

    const [user, loading] = useAuthState(auth);

    const [userFrmCtx, setUserFrmCtx] = useState<UserInterface>(ctx.state.user);

    useEffect(() => {
        if (user) {
            setUserFrmCtx(ctx.state.user);
            locCtx.dispatch({
                type: 'SET_MARKERPOINTS',
                payload: props.markerPoints,
            });
        }
    }, [user, ctx.state.user]);

    useEffect(() => {
        setPageIsMounted(true);

        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: 'my-map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lat, lng],
            zoom: zoom,
        });

        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            })
        );

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, []);

    if (loading) {
        return (
            <>
                <LoadingModal />
                <div id='my-map' className='map-container' />
            </>
        );
    } else {
        return (
            <>
                {user && (
                    <Layout>
                        <Head>
                            <title>Home</title>
                            <link
                                href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css'
                                rel='stylesheet'
                            />

                            <meta
                                name='viewport'
                                content='initial-scale=1.0, width=device-width'
                            />
                        </Head>
                        {/* {<DynamicMap />} */}
                        <div>
                            <div className='sidebar'>
                                Longitude: {lng} | Latitude: {lat} | Zoom:{' '}
                                {zoom}
                            </div>
                            <div
                                id='my-map'
                                style={{ height: 400, width: '100%' }}
                            />
                        </div>
                        <Flex
                            h='full'
                            flexDirection={{ base: 'column', xl: 'column' }}
                            gap={10}>
                            {props.posts.map((post, idx) => {
                                return (
                                    <Text key={post.postId}>{post.title}</Text>
                                );
                            })}
                        </Flex>
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
