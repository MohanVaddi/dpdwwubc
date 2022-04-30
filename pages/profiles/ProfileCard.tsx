import {
    Flex,
    Image,
    VStack,
    Text,
    Center,
    Stack,
    Tooltip,
    Box,
    Badge,
    Button,
    Circle,
    useColorModeValue,
    HStack,
} from '@chakra-ui/react';
import { CheckCircleIcon, PhoneIcon, WarningIcon } from '@chakra-ui/icons';
import { MdCall } from 'react-icons/md';

import Link from 'next/link';
import {
    tConvert,
    isAvailable,
    truncateAndAddElipsis,
    getDate,
    checkIfWorkingOnThatDay,
} from '../../utils/functions';
import { OpenToWork } from '../../types/arbeit';
import { capitalize } from 'lodash';

interface ProfileCardProps {
    profile?: OpenToWork;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    if (!profile) {
        return <></>;
    }

    return (
        <>
            <Stack
                // backgroundColor={useColorModeValue('gray.100', '#231e39')}
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
                <Center
                    w='full'
                    h='full'
                    // px={{
                    //     base: 8,
                    //     sm: 10,
                    //     lg: 12,
                    // }}
                    py={4}>
                    <Image
                        rounded={'5px'}
                        // borderRadius={''}
                        src={profile!.photoURL as string}
                        alt=''
                        width={'200px'}
                        height={'200px'}
                    />
                </Center>
                <VStack px={10} py={4} spacing={3} w='full' align={'center'}>
                    <Tooltip label={profile!.username}>
                        <Text
                            // align={'center'}
                            w='full'
                            noOfLines={1}
                            fontSize={'xl'}
                            fontWeight={600}
                            isTruncated>
                            {profile!.username && profile!.username.length > 15
                                ? truncateAndAddElipsis(profile!.username)
                                : profile!.username}
                        </Text>
                    </Tooltip>
                    {/* <Text>{`${age}/ ${sex.toLocaleUpperCase()}`}</Text> */}
                    {/* <Stack direction={'row'} justifyContent='space-evenly'>
                        <Badge colorScheme={'purple'}>{age}</Badge>
                        <Badge colorScheme={'green'}>
                            {sex && sex.toLocaleUpperCase()}
                        </Badge>
                    </Stack> */}
                    <Text
                        w='full'
                        fontSize={'lg'}
                        fontWeight={600}>{`${capitalize(
                        profile!.expertise
                    )}`}</Text>
                    <Text fontWeight={600} w='full'>
                        {profile!.fromTime &&
                            profile!.toTime &&
                            `${tConvert(profile!.fromTime)} - ${tConvert(
                                profile!.toTime
                            )}`}
                    </Text>
                    <Tooltip
                        label={
                            profile!.fromTime &&
                            profile!.toTime &&
                            isAvailable(
                                `${profile!.fromTime}:00`,
                                `${profile!.toTime}:00`
                            )
                                ? 'Worker is available'
                                : 'Worker is unavailable'
                        }>
                        <Text position={'absolute'} top='1' right={'2'}>
                            {profile!.fromTime &&
                            profile!.toTime &&
                            isAvailable(
                                `${profile!.fromTime}:00`,
                                `${profile!.toTime}:00`
                            ) ? (
                                <CheckCircleIcon
                                    m={0}
                                    p={0}
                                    color='green.600'
                                    boxSize={5}
                                />
                            ) : (
                                <WarningIcon
                                    m={0}
                                    p={0}
                                    color={'red.600'}
                                    boxSize={5}
                                />
                            )}
                        </Text>
                    </Tooltip>

                    <Text>{profile!.mobile && profile!.mobile}</Text>

                    <HStack w='full' justifyContent={'space-between'}>
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
                                                profile!.workingDays
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
                    {/* 
                    <HStack w='full' justifyContent={'space-between'}>
                        <Link href={`/user/${uuid && uuid}`} passHref>
                            <Button
                                colorScheme={'messenger'}
                                rounded='xl'
                                variant='ghost'>
                                View Profile
                            </Button>
                        </Link> 
                        <Link href={`tel:${mobile && mobile}`} passHref>
                            <Button
                                colorScheme={'green'}
                                variant='outline'
                                rounded={'xl'}
                                rightIcon={<MdCall />}>
                                Call
                            </Button>
                            <Circle size='40px' bg='green' color='white'>
                                <PhoneIcon />
                            </Circle> 
                        </Link>
                    </HStack> */}

                    <HStack w='full' pt={5} textAlign='right'>
                        <Text fontSize={'smaller'}>
                            {`Last Updated : 
                            ${getDate(
                                parseInt(profile!.createdAt as string),
                                '/'
                            )}`}
                        </Text>
                    </HStack>
                </VStack>
            </Stack>
        </>
    );
};

export default ProfileCard;
