import {
    Button,
    Box,
    useDisclosure,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    Textarea,
    useToast,
    Text,
    HStack,
    Stack,
    Image,
    VStack,
    Tooltip,
    Badge,
    Circle,
    Link,
    SimpleGrid,
    useColorModeValue,
    Divider,
    Spacer,
} from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext, { initialUser, User } from '../../context/AppContext';
import ProfileImgUp from './ProfileImgUp';
import { Select } from 'chakra-react-select';
import { UserInterface } from '../../types/arbeit';
import { debounce } from 'lodash';
import { Posts } from '../../types/arbeit';
import { v4 } from 'uuid';
import { CheckCircleIcon, PhoneIcon, WarningIcon } from '@chakra-ui/icons';
import { truncateAndAddElipsis } from '../../utils/functions';
import { MdCall } from 'react-icons/md';
import { professions } from '../../lib/config';
import { backend_uri } from '../../lib/isDevEnvironment';
import MapBox from '../../components/MapBox';
import LocContext from '../../context/LocContext';
import mapboxgl from 'mapbox-gl';

import { MapboxMap } from 'react-map-gl';
//@ts-ignore
// import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken =
    'pk.eyJ1IjoibW9oYW5rZW5vYmkiLCJhIjoiY2wybGV6NDVmMGNwNjNqbmsyczIwOW1nYiJ9.PuddGS4XNYZXHDDeskldpg';

interface MakeAPostProps {}

const MakeAPost: React.FC<MakeAPostProps> = ({}) => {
    const toast = useToast();
    const ctx = useContext(AppContext);

    const [userCtx, setUserCtx] = useState<UserInterface>(ctx.state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSendingPost, setIsSendingPost] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [profession, setProfession] = useState<string>('');
    const [location, setLocation] = useState<
        GeolocationCoordinates | undefined
    >(undefined);

    const [lng, setLng] = useState<number | undefined>(undefined);
    const [lat, setLat] = useState<number | undefined>(undefined);
    const initialRef = React.useRef<any>();

    const setLngLatHandler = (lng: number, lat: number) => {
        console.log(`Lng : ${lng}, Lat : ${lat}`);
        setLng(lng);
        setLat(lat);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((e) => {
            setLocation(e.coords);
        });
        setUserCtx(ctx.state.user);
    }, []);

    useEffect(() => {
        setUserCtx(ctx.state.user);
    }, [ctx.state.user]);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((e) => {
                console.log('getting here', e.coords);
                setLocation(e.coords);
            }, onLocationError);
        } else {
            toast({
                title: 'Error.',
                description: `Geolocation not supported by this browser.`,
                status: 'error',
                duration: 4000,
                isClosable: true,
                onCloseComplete: () => {},
            });
        }
    };

    const onLocationError = async () => {
        try {
            const permission = await navigator.permissions.query({
                name: 'geolocation',
            });
            if (permission.state === 'denied') {
                toast({
                    title: 'Location Denied.',
                    description: `Permission Denied.`,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    onCloseComplete: () => {},
                });
            } else if (permission.state === 'prompt') {
                toast({
                    title: 'Accept permission.',
                    description: `Please accept permission.`,
                    status: 'info',
                    duration: 4000,
                    isClosable: true,
                    onCloseComplete: () => {},
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose();
        setIsSendingPost(true);
        getLocation();
        console.log(title);
        console.log(description);
        console.log(profession);
        console.log(location);

        console.log(lng, lat);

        if (lng === undefined || lat === undefined) {
            toast({
                title: 'Marker Unavailable.',
                description: `Marker not set.`,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            setIsSendingPost(false);
            return;
        }

        // !!! STRICT CHECK
        // ! checking if location is provided or not.
        // if (!location) {
        //     toast({
        //         title: 'No Location.',
        //         description: `Location not provided.`,
        //         status: 'error',
        //         duration: 4000,
        //         isClosable: true,
        //     });
        //     setIsSendingPost(false);

        //     return;
        // }

        // TODO : Check if the user's mobile is verified or not. If not redirect to /verifyMobile route.

        // ! checking if title has less than 10 characters.
        if (title.trim().length < 10) {
            toast({
                title: 'Error.',
                description: `Title must contain min 10 letters.`,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            setIsSendingPost(false);

            return;
        }

        // ! checking if description has less than 10 characters.
        if (description.trim().length < 10) {
            toast({
                title: 'Error.',
                description: `Description must contain min 10 letters.`,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            setIsSendingPost(false);

            return;
        }

        // ! validating if fields are empty.
        if (
            title.trim().length === 0 ||
            description.trim().length === 0 ||
            profession.trim().length === 0
        ) {
            toast({
                title: 'Error.',
                description: `Fields can't be empty.`,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            setIsSendingPost(false);
            return;
        }

        try {
            const res: AxiosResponse<Partial<UserInterface>> = await axios.post(
                `${backend_uri}/user/createPost`,
                {
                    postId: v4(),
                    userId: userCtx.userId,
                    username: userCtx.username,
                    isMobileVerified: false,
                    mobile:
                        (ctx.state.user.openToWork!.mobile as string) ||
                        '9393636688',
                    email: userCtx.email,
                    title,
                    description,
                    location: `${lat} ${lng}`,
                    expertiseNeeded: profession,
                    createdAt: new Date().getTime(),
                }
            );

            console.log(res.data);
            ctx.dispatch({
                type: 'SET_USER',
                payload: {
                    ...(res.data as User),
                },
            });

            setIsSendingPost(false);
        } catch (err) {
            console.log(err);
            toast({
                title: 'Error.',
                description: `Unable to send posts.`,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            setIsSendingPost(false);
        }
        setIsSendingPost(false);
    };

    return (
        <>
            <VStack w='full' textAlign='right' spacing={6}>
                <HStack w='full'>
                    <Text
                        fontStyle={'bold'}
                        color={'primary.500'}
                        fontSize={'2xl'}>
                        &nbsp;Your Posts
                    </Text>
                    <Spacer />
                    <Button
                        variant={'primary'}
                        onClick={onOpen}
                        isLoading={isSendingPost}>
                        Create Post
                    </Button>
                </HStack>
                <Divider />
                {/* <Box w='full' textAlign={'left'}>
                    <Divider />
                </Box> */}
                <SimpleGrid w='full' columns={[1, 1, 2]} spacing={[2, 6]}>
                    {userCtx?.posts &&
                        userCtx.posts
                            .sort(
                                (ele1, ele2) =>
                                    parseInt(ele2.createdAt as string) -
                                    parseInt(ele1.createdAt as string)
                            )
                            .map((post) => {
                                return (
                                    <PostComp key={post.postId} post={post} />
                                );
                            })}
                </SimpleGrid>
            </VStack>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={initialRef}>
                <ModalOverlay />
                <form onSubmit={submitHandler}>
                    <ModalContent>
                        <ModalHeader>Create Post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    ref={initialRef}
                                    value={title}
                                    placeholder='Title'
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    size={'md'}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                    value={description}
                                    placeholder='Description'
                                />
                            </FormControl>

                            <FormControl my='4'>
                                <FormLabel>Profession</FormLabel>
                                <Select
                                    onChange={(e) => {
                                        setProfession(e?.value as string);
                                    }}
                                    options={professions}
                                />
                            </FormControl>
                            <CustMapWithMarker setLngLat={setLngLatHandler} />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type='submit'
                                color={'primary.500'}
                                variant='outline'>
                                Post
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};

interface PostCompProps {
    post: Posts;
}

export const PostComp: React.FC<PostCompProps> = ({ post }) => {
    const dateNTime = new Date(parseInt(post.createdAt as string));
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

                    <HStack>
                        <Text>{post.expertiseNeeded.toLocaleUpperCase()}</Text>
                        <Text>{post.mobile}</Text>
                    </HStack>

                    <HStack w='full' justifyContent={'space-between'}>
                        {/* <Link
                            href={`tel:${post.mobile && post.mobile}`}
                            passHref
                            textDecoration={'none'}> */}
                        {/* <Button
                            colorScheme={'green'}
                            variant='outline'
                            rounded={'xl'}
                            rightIcon={<MdCall />}>
                            Call
                        </Button> */}
                        {/* </Link> */}
                    </HStack>
                </VStack>
            </Stack>
        </>
    );
};

interface CustMapWithMarkerProps {
    setLngLat?: any;
}
const CustMapWithMarker: React.FC<CustMapWithMarkerProps> = ({ setLngLat }) => {
    const locCtx = useContext(LocContext);
    const map = useRef<MapboxMap | null>(null);
    const [pageIsMounted, setPageIsMounted] = useState(false);
    // const [lat, setLat] = useState<number>(locCtx.state.location.lat);
    // const [lng, setLng] = useState<number>(locCtx.state.location.lng);
    // const [zoom, setZoom] = useState<number>(10);
    let customMarker = useRef<mapboxgl.Marker | undefined>(undefined);

    useEffect(() => {
        setPageIsMounted(true);

        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: 'cust_map',
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [locCtx.state.location.lng, locCtx.state.location.lat],
            zoom: 12,
            attributionControl: false,
        });

        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            })
        );
        map.current.addControl(new mapboxgl.FullscreenControl());

        // map.current.on('move', () => {
        //     setLng(parseFloat(map.current!.getCenter().lng.toFixed(4)));
        //     setLat(parseFloat(map.current!.getCenter().lat.toFixed(4)));
        //     setZoom(parseFloat(map.current!.getZoom().toFixed(2)));
        // });

        map.current.on('click', (e) => {
            if (customMarker.current) {
                customMarker.current.remove();
            }
            console.log(e.lngLat);
            customMarker.current = new mapboxgl.Marker({
                color: 'red',
            })
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .addTo(map.current!);

            setLngLat(e.lngLat.lng, e.lngLat.lat);
        });
    }, []);
    return (
        <div
            id='cust_map'
            style={{
                height: 400,
                width: '100%',
                zIndex: 0,
            }}
        />
    );
};
export default MakeAPost;
