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
import { Worker } from '../../types/arbeit';
import {
    tConvert,
    isAvailable,
    truncateAndAddElipsis,
} from '../../utils/functions';

const WorkerCard: React.FC<Worker> = ({
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
                <Box
                    px={{
                        base: 8,
                        sm: 10,
                        lg: 12,
                    }}
                    py={4}>
                    <Image
                        rounded={'50%'}
                        // borderRadius={''}
                        src={profileImage}
                        alt=''
                        width={'200px'}
                        height={'200px'}
                    />
                </Box>
                <VStack
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
                            {fullname && fullname.length > 15
                                ? truncateAndAddElipsis(fullname)
                                : fullname}
                        </Text>
                    </Tooltip>
                    {/* <Text>{`${age}/ ${sex.toLocaleUpperCase()}`}</Text> */}
                    <Stack direction={'row'} justifyContent='space-evenly'>
                        <Badge colorScheme={'purple'}>{age}</Badge>
                        <Badge colorScheme={'green'}>
                            {sex && sex.toLocaleUpperCase()}
                        </Badge>
                    </Stack>
                    <Text
                        fontSize={'lg'}
                        fontWeight={600}>{`${expertise}`}</Text>
                    <Text fontWeight={600}>
                        {fromTime &&
                            toTime &&
                            `${tConvert(fromTime)} - ${tConvert(toTime)}`}
                    </Text>
                    <Tooltip
                        label={
                            fromTime &&
                            toTime &&
                            isAvailable(`${fromTime}:00`, `${toTime}:00`)
                                ? 'Worker is available'
                                : 'Worker is unavailable'
                        }>
                        <Text position={'absolute'} top='1' right={'2'}>
                            {fromTime &&
                            toTime &&
                            isAvailable(`${fromTime}:00`, `${toTime}:00`) ? (
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

                    <Text>{mobile && mobile}</Text>
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

export default WorkerCard;
