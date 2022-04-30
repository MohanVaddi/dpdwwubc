import {
    Button,
    Input,
    FormControl,
    FormLabel,
    Box,
    SimpleGrid,
    Center,
    HStack,
    CheckboxGroup,
    Checkbox,
    useToast,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext, { User } from '../../context/AppContext';
import ProfileImgUp from './ProfileImgUp';
import { Select } from 'chakra-react-select';
import { professions } from '../../lib/config';
import { OpenToWork, WorkingDays } from '../../types/arbeit';
import axios, { AxiosResponse } from 'axios';
import { backend_uri } from '../../lib/isDevEnvironment';
import { getGooglePhotoUrl } from '../../utils/functions';

const OpenToWorkForm: React.FC<{}> = (): JSX.Element => {
    const ctx = useContext(AppContext);
    const toast = useToast();

    const [profession, setProfession] = useState<string>('');
    const [fromTime, setFromTime] = useState<string>('08:00');
    const [toTime, setToTime] = useState<string>('16:00');
    const [isSendingPost, setIsSendingPost] = useState<boolean>(false);
    const [location, setLocation] = useState<
        GeolocationCoordinates | undefined
    >(undefined);
    const [workingDays, setWorkingDays] = useState<WorkingDays[]>([
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
    ]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((e) => {
            setLocation(e.coords);
        });
    }, []);

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

    const submitHandler = async (e: any) => {
        setIsSendingPost(true);
        e.preventDefault();
        getLocation();

        // ! validating if fields are empty.
        if (profession.trim().length === 0) {
            toast({
                title: 'Error.',
                description: `Fields can't be empty.`,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            setIsSendingPost(false);
            console.log('profession is empty');
            return;
        }

        const userObj: OpenToWork = {
            userId: ctx.state.user.userId,
            username: ctx.state.user.username,
            // mobile: ctx.state.user.mobile,
            email: ctx.state.user.email,
            photoURL: ctx.state.user.photoURL,
            isMobileVerified: ctx.state.user.isMobileVerified as boolean,
            location: `${location!.latitude} ${location!.longitude}`,
            expertise: profession,
            workingDays: workingDays,
            fromTime: fromTime,
            toTime: toTime,
            createdAt: new Date().getTime().toString(),
        };

        console.log(userObj);
        try {
            const res: AxiosResponse<Partial<OpenToWork>> = await axios.post(
                `${backend_uri}/user/setOpentowork`,
                {
                    ...userObj,
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
            <Box
                as={'form'}
                onSubmit={submitHandler}
                w='full'
                textAlign={'right'}>
                <SimpleGrid columns={[1, 2]} w='full' mb={8}>
                    <Center w='full' h='full'>
                        <ProfileImgUp
                            imgUrl={getGooglePhotoUrl(
                                ctx.state.user.photoURL as string,
                                '300'
                            )}
                        />
                    </Center>
                    <Box px={[1, 8, 10]} w='full'>
                        <FormControl mt={4}>
                            <FormLabel>Name:</FormLabel>
                            <Input
                                value={ctx.state.user.username}
                                placeholder='Name'
                                onChange={() => {}}
                            />
                        </FormControl>

                        <FormControl mt={6}>
                            <FormLabel>Email ID:</FormLabel>
                            <Input
                                readOnly={true}
                                value={ctx.state.user.email}
                                placeholder='Email'
                            />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Profession:</FormLabel>
                            <Select
                                onChange={(e) => {
                                    setProfession(e?.value as string);
                                }}
                                options={professions}
                            />
                        </FormControl>

                        <FormControl mt={6}>
                            <FormLabel>Available Week days:</FormLabel>
                            <CheckboxGroup
                                value={workingDays}
                                onChange={(e) => {
                                    setWorkingDays(e as any);
                                }}>
                                <SimpleGrid columns={3} spacing='2'>
                                    <Checkbox value='monday'>Monday</Checkbox>
                                    <Checkbox value='tuesday'>Tuesday</Checkbox>
                                    <Checkbox value='wednesday'>
                                        Wednesday
                                    </Checkbox>
                                    <Checkbox value='thursday'>
                                        Thursday
                                    </Checkbox>
                                    <Checkbox value='friday'>Friday</Checkbox>
                                    <Checkbox value='saturday'>
                                        Saturday
                                    </Checkbox>
                                    <Checkbox value='sunday'>Sunday</Checkbox>
                                </SimpleGrid>
                            </CheckboxGroup>
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Timings:</FormLabel>
                            <HStack w='full'>
                                <Input
                                    value={fromTime}
                                    type={'time'}
                                    onChange={(e) => {
                                        setFromTime(e.target.value);
                                    }}
                                />
                                <Input
                                    value={toTime}
                                    type={'time'}
                                    onChange={(e) => {
                                        setToTime(e.target.value);
                                    }}
                                />
                            </HStack>
                        </FormControl>
                    </Box>
                </SimpleGrid>
                <Button variant={'primary'} type='submit'>
                    Open To Work
                </Button>
            </Box>
        </>
    );
};

export default OpenToWorkForm;
