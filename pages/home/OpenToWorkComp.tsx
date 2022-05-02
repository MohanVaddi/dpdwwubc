import {
    Button,
    Center,
    SimpleGrid,
    Text,
    Flex,
    Box,
    VStack,
    Image,
    ListItem,
    ListIcon,
    List,
    HStack,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import OpenToWorkForm from './OpenToWorkForm';
import axios, { AxiosResponse } from 'axios';
import { UserInterface } from '../../types/arbeit';
import {
    checkIfWorkingOnThatDay,
    getGooglePhotoUrl,
    tConvert,
} from '../../utils/functions';
import { capitalize } from 'lodash';
import { backend_uri } from '../../lib/isDevEnvironment';

const OpenToWorkComp: React.FC<{}> = () => {
    const ctx = useContext(AppContext);

    const removeOpenToWorkHandler = async () => {
        const userFromDB: AxiosResponse<UserInterface> = await axios.post(
            `${backend_uri}/user/removeOpentowork`,
            {},
            {
                headers: {
                    'x-user-id': ctx.state.user.userId,
                },
            }
        );

        ctx.dispatch({
            type: 'REMOVE_OPENTOWORK',
        });
        console.log('userFromDB ', userFromDB);
    };

    if (ctx.state.user.openToWork) {
        return (
            <Flex w='full' h='full'>
                <SimpleGrid
                    h='full'
                    w='full'
                    columns={[1, 1, 2]}
                    gap={[6, 6, 0, 0]}
                    spacing={6}>
                    <Center as={VStack} w='full' h='full' textAlign={'center'}>
                        <Image
                            w='250px'
                            h='250px'
                            alt={'profile picture'}
                            referrerPolicy='no-referrer'
                            src={getGooglePhotoUrl(
                                ctx.state.user.openToWork.photoURL as string,
                                '300'
                            )}
                            rounded={'5px'}
                        />
                        {/* <Text
                            fontSize={'3xl'}
                            fontWeight='900'
                            color='primary.500'
                            w='full'
                            h='full'>
                            {ctx.state.user.username}
                        </Text> */}
                    </Center>
                    <VStack
                        w='full'
                        h='full'
                        textAlign={{
                            md: 'left',
                        }}
                        spacing={4}>
                        <Text
                            fontSize={'3xl'}
                            fontWeight='900'
                            color='primary.800'
                            w='full'>
                            {ctx.state.user.username}
                        </Text>
                        <Text fontWeight='500' fontSize={'md'} w='full'>
                            {ctx.state.user.openToWork.email}
                        </Text>
                        {ctx.state.user.openToWork &&
                        ctx.state.user.openToWork.isMobileVerified ? (
                            <Text fontWeight='500' fontSize={'sm'} w='full'>
                                {ctx.state.user.openToWork.mobile}
                            </Text>
                        ) : (
                            <Text fontSize={'sm'} color='gray.500' w='full'>
                                Phone Number not verified
                            </Text>
                        )}
                        <Text w='full'>{`${capitalize(
                            ctx.state.user.openToWork.expertise
                        )}`}</Text>
                        <Text w='full'>{`${tConvert(
                            ctx.state.user.openToWork.fromTime
                        )} to ${tConvert(
                            ctx.state.user.openToWork.toTime
                        )}`}</Text>{' '}
                        <HStack w='full'>
                            {['M', 'T', 'W', 'Th', 'F', 'Sa', 'S'].map(
                                (day, idx) => {
                                    return (
                                        <Center
                                            key={idx}
                                            w='25px'
                                            h='25px'
                                            rounded={'full'}
                                            backgroundColor={
                                                checkIfWorkingOnThatDay(
                                                    day,
                                                    ctx.state.user!.openToWork!
                                                        .workingDays
                                                )
                                                    ? 'green.300'
                                                    : 'red.400'
                                            }
                                            padding={2}>
                                            <Text>{day}</Text>
                                        </Center>
                                    );
                                }
                            )}
                        </HStack>
                    </VStack>
                    <div></div>
                    <Box as='div' w='full' pt={10}>
                        <Button
                            onClick={removeOpenToWorkHandler}
                            colorScheme='red'>
                            Disable
                        </Button>
                    </Box>
                </SimpleGrid>
            </Flex>
        );
    } else {
        return (
            <VStack w='full' h='full'>
                <Text fontSize={'md'} color={'red'}>
                    You haven&apos;t set your profile public yet.
                </Text>
                <OpenToWorkForm />
            </VStack>
        );
    }
};

export default OpenToWorkComp;
