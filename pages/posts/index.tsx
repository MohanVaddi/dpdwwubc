import { Search2Icon } from '@chakra-ui/icons';
import {
    Button,
    ButtonProps,
    HStack,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    VStack,
    Box,
    Center,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Layout from '../../components/UI/Layout';
import { MdCall, MdLocationSearching } from 'react-icons/md';
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
import { sortChronological } from '../../utils/functions';

interface PostPageProps {
    children?: React.ReactNode;

    posts: Posts[];
    markerPoints: LatLngLiteral[];
}

const Posts: NextPage<PostPageProps> = (props) => {
    const ctx = useContext(AppContext);

    const locCtx = useRef(useContext(LocContext));

    const [user, loading] = useAuthState(auth);

    const [userFrmCtx, setUserFrmCtx] = useState<UserInterface>(ctx.state.user);

    const [posts, setPosts] = useState<Posts[]>(
        props.posts.filter(
            (post) =>
                post.userId !== ctx.state.user.userId &&
                post.expertiseNeeded === ctx.state.user.openToWork?.expertise
        )
    );

    const [lat, setLat] = useState<number | undefined>(undefined);
    const [lng, setLng] = useState<number | undefined>(undefined);

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

    sortChronological(posts, 'createdAt');

    const locateHandler = (lng: number, lat: number) => {
        console.log(`Lat ${lat}, lng ${lng}`);
        setLng(lng);
        setLat(lat);
    };

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
                        {/* {<DynamicMap />} */}
                        <MapBox posts={posts} locateLat={lat} locateLng={lng} />
                        {ctx.state.user.openToWork && (
                            <SimpleGrid
                                w='full'
                                columns={[1, 1, 2]}
                                spacing={[2, 6]}
                                mt={10}>
                                {posts.map((post, idx) => {
                                    return (
                                        <PostCompWithLocate
                                            locate={locateHandler}
                                            key={idx}
                                            post={post}
                                        />
                                    );
                                })}
                            </SimpleGrid>
                        )}
                        {!ctx.state.user.openToWork && (
                            <Center padding={10}>
                                <Text
                                    fontSize={'lg'}
                                    color='red.500'
                                    align={
                                        'center'
                                    }>{`Set your profile to pubic`}</Text>
                            </Center>
                        )}
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
            lat: parseFloat(post.location.split(' ')[0] as string),
            lng: parseFloat(post.location.split(' ')[1] as string),
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

interface PostCompProps {
    post: Posts;
    locate: (lng: number, lat: number) => void;
}

const PostCompWithLocate: React.FC<PostCompProps> = ({ post, locate }) => {
    const dateNTime = new Date(parseInt(post.createdAt as string));

    const setPostsToWaiting = async () => {};

    const locateHandler = () => {
        locate(
            parseFloat(post.location.split(' ')[1] as string),
            parseFloat(post.location.split(' ')[0] as string)
        );
    };

    return (
        <>
            <Stack
                textAlign={'left'}
                backgroundColor={useColorModeValue('gray.100', '#231e39')}
                borderWidth='1px'
                w={{
                    base: 'full',
                    sm: 'auto',
                }}
                borderRadius={'md'}
                spacing={2}
                direction={{ base: 'column', sm: 'row', md: 'column' }}
                // cursor='pointer'
                boxShadow={'md'}
                position='relative'
                align={'center'}
                mb={6}>
                <VStack px={10} py={4} spacing={3} w='full' align={'left'}>
                    <Text
                        // align={'center'}
                        w='full'
                        noOfLines={1}
                        fontSize={'xl'}
                        fontWeight={600}>
                        {post.title}
                    </Text>
                    <Text
                        fontSize={
                            'sm'
                        }>{`${dateNTime.getDate()}/${dateNTime.getMonth()}/${dateNTime.getFullYear()}   ${dateNTime.getHours()}:${dateNTime.getMinutes()}`}</Text>
                    <Text fontSize={'lg'}>{`${post.description}`}</Text>

                    <HStack w='full'>
                        <Text>{post.expertiseNeeded.toLocaleUpperCase()}</Text>
                        <Text>{post.mobile}</Text>
                    </HStack>

                    <HStack w='full'>
                        <Button
                            variant={'solid'}
                            onClick={locateHandler}
                            colorScheme='blue'>
                            Locate on map
                        </Button>
                    </HStack>

                    {/* <HStack w='full'>
                        <Button variant={'solid'} colorScheme='green' onClick={setPostsToWaiting}>
                            Accept
                        </Button>
                    </HStack> */}

                    {/*  <HStack w='full' justifyContent={'space-between'}>
                        {/* <Link
                            href={`tel:${post.mobile && post.mobile}`}
                            passHref
                            textDecoration={'none'}> 
                        <Button
                            colorScheme={'green'}
                            variant='outline'
                            rounded={'xl'}
                            rightIcon={<MdCall />}>
                            Call
                        </Button>
                        </Link> 
                    </HStack> */}
                </VStack>
            </Stack>
        </>
    );
};

export default Posts;
