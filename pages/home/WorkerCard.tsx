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
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { MdCall } from 'react-icons/md';

import Link from 'next/link';
import { Worker } from '../../types/main';

const truncateAndAddElipsis = (fname: string) => {
    return `${fname.slice(0, 15)}...`;
};

export const WorkerCard: React.FC<Worker> = ({
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
        <>
            <Stack
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
                <Box
                    px={{
                        base: 8,
                        sm: 10,
                        lg: 12,
                    }}
                    py={4}
                >
                    <Image
                        rounded={
                            '50%'
                        }
                        // borderRadius={''}
                        src={profileImage}
                        alt=''
                        width={'200px'}
                        height={'200px'}
                    />
                </Box>
                <VStack
                    backgroundColor={useColorModeValue('gray.100', '')}
                    px={10}
                    py={4}
                    spacing={3}
                    w='full'
                    align={'center'}>
                    <Tooltip label={fullname}>
                        <Text
                            align={'center'}
                            w='full'
                            noOfLines={1}
                            fontSize={'xl'}
                            fontWeight={600}
                            isTruncated>
                            {fullname.length > 15
                                ? truncateAndAddElipsis(fullname)
                                : fullname}
                        </Text>
                    </Tooltip>
                    {/* <Text>{`${age}/ ${sex.toLocaleUpperCase()}`}</Text> */}
                    <Stack direction={'row'} justifyContent='space-evenly'>
                        <Badge colorScheme={'purple'}>{age}</Badge>
                        <Badge colorScheme={'green'}>
                            {sex.toLocaleUpperCase()}
                        </Badge>
                    </Stack>
                    <Text
                        fontSize={'lg'}
                        fontWeight={600}>{`${expertise}`}</Text>
                    <Text fontWeight={600}>{`${tConvert(fromTime)} - ${tConvert(
                        toTime
                    )}`}</Text>
                    <Tooltip
                        label={
                            isAvailable(`${fromTime}:00`, `${toTime}:00`)
                                ? 'Worker is available'
                                : 'Worker is unavailable'
                        }>
                        <Text position={'absolute'} top='1' right={'2'}>
                            {isAvailable(`${fromTime}:00`, `${toTime}:00`) ? (
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

                    <Text>{mobile}</Text>
                    <HStack w='full' justifyContent={'space-between'}>
                        <Link href={`/user/${uuid}`} passHref>
                            <Button
                                colorScheme={'messenger'}
                                rounded='xl'
                                variant='ghost'>
                                View Profile
                            </Button>
                        </Link>
                        <Link href={`tel:${mobile}`} passHref>
                            <Button
                                colorScheme={'green'}
                                variant='outline'
                                rounded={'xl'}
                                rightIcon={<MdCall />}>
                                Call
                            </Button>
                            {/* <Circle size='40px' bg='green' color='white'>
                                <PhoneIcon />
                            </Circle> */}
                        </Link>
                    </HStack>
                </VStack>
            </Stack>
        </>
    );
};

function tConvert(time: any) {
    time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
        time = time.slice(1);
        time[3] = ' ';
        time[5] = +time[0] < 12 ? 'AM' : 'PM';
        time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
}

function isAvailable(startTime: string, endTime: string) {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime());
    startDate.setHours(parseInt(startTime.split(':')[0]));
    startDate.setMinutes(parseInt(startTime.split(':')[1]));
    startDate.setSeconds(parseInt(startTime.split(':')[2]));
    const endDate = new Date(currentDate.getTime());
    endDate.setHours(parseInt(endTime.split(':')[0]));
    endDate.setMinutes(parseInt(endTime.split(':')[1]));
    endDate.setSeconds(parseInt(endTime.split(':')[2]));
    const valid = startDate < currentDate && endDate > currentDate;
    return valid;
}
