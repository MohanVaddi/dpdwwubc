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
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import OpenToWorkForm from './OpenToWorkForm';
import axios, { AxiosResponse } from 'axios';
import { UserInterface } from '../../types/arbeit';
import { getGooglePhotoUrl, tConvert } from '../../utils/functions';
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
                    <Center w='full' h='full'>
                        <Image
                            w='300px'
                            h='300px'
                            alt={'profile picture'}
                            referrerPolicy='no-referrer'
                            src={getGooglePhotoUrl(
                                ctx.state.user.openToWork.photoURL as string,
                                '300'
                            )}
                            rounded='full'
                        />
                    </Center>
                    <VStack
                        w='full'
                        h='full'
                        textAlign={{
                            base: 'center',
                            sm: 'center',
                            md: 'left',
                        }}>
                        <Text
                            fontSize={'3xl'}
                            fontWeight='900'
                            color='primary.500'
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
                        <Text w='full'>{`Working days:`}</Text>
                        <List w='full' spacing={2} pl='3'>
                            {ctx.state.user.openToWork.workingDays.map(
                                (ele, idx) => {
                                    return (
                                        <ListItem key={idx}>
                                            <ListIcon
                                                as={MdCheckCircle}
                                                color='green.500'
                                            />
                                            {capitalize(ele)}
                                        </ListItem>
                                    );
                                }
                            )}
                        </List>
                        <Box w='full'>
                            <Button
                                onClick={removeOpenToWorkHandler}
                                colorScheme='red'>
                                Disable
                            </Button>
                        </Box>
                    </VStack>
                </SimpleGrid>
            </Flex>
        );
    } else {
        return (
            <VStack w='full' h='full'>
                <Text fontSize={'lg'}>
                    You haven&apos;t set your Open to Work yet.
                </Text>
                <OpenToWorkForm />
            </VStack>
        );
    }
};

export default OpenToWorkComp;
