import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
    Button,
    ButtonProps,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
    Text,
    MenuDivider,
    VStack,
    Container,
    Flex,
    Image,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center,
    useColorModeValue,
    SimpleGrid,
} from '@chakra-ui/react';
import {
    ChevronDownIcon,
    Search2Icon,
    CheckCircleIcon,
    WarningIcon,
} from '@chakra-ui/icons';
import workersData from '../../../context/workerData';
import Layout from '../../../components/UI/Layout';
import Header from '../../../components/UI/Header';

const UserPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const cardBackgroundColor = useColorModeValue('gray.100', '#231e39');

    const User: any = workersData.find(
        (ele) => ele.uuid === parseInt(id as string)
    );
    if (!User) {
        return <>No User</>;
    }
    const {
        fullname,
        profileImage,
        age,
        sex,
        expertise,
        mobile,
        fromTime,
        toTime,
        address,
    } = User;
    return (
        <>
            <Header />
            <Container
                w='full'
                maxW='container.lg'
                h='100vh'
                pt={8}
                px={{ base: 6, md: 10, lg: 0 }}>
                <Head>
                    <title>{`User ${id}`}</title>
                    <meta
                        name='viewport'
                        content='initial-scale=1.0, width=device-width'
                    />
                </Head>
                <HStack
                    backgroundColor={cardBackgroundColor}
                    flexDir={{
                        base: 'column',
                        md: 'row',
                    }}
                    borderRadius={'md'}
                    boxShadow='md'>
                    <Stack w='full' h='full' align='center' p={5}>
                        <Image
                            src={profileImage}
                            alt=''
                            width={'300px'}
                            h='300px'
                            padding={[2, 6]}
                        />
                    </Stack>
                    <VStack w='full' h='full' align={'center'}>
                        <Center>
                            <SimpleGrid columns={2} spacing='4' p={10}>
                                <Text fontWeight={600}>Name</Text>
                                {fullname}

                                <Text fontWeight={600}>Age/ Gender</Text>
                                {`${age}/ ${sex.toLocaleUpperCase()}`}

                                <Text fontWeight={600}>Address</Text>

                                <Text
                                    isTruncated>{`${address.door_no}, ${address.street}, ${address.village}, ${address.state}, ${address.pincode}`}</Text>
                                <Text fontWeight={600}>Profession</Text>
                                {`${expertise}`}
                                <Text fontWeight={600}>Timings</Text>
                                {`${tConvert(fromTime)} - ${tConvert(toTime)}`}
                                <Text fontWeight={600}>Is Available</Text>

                                {isAvailable(
                                    `${fromTime}:00`,
                                    `${toTime}:00`
                                ) ? (
                                    <CheckCircleIcon color='green' />
                                ) : (
                                    <WarningIcon color={'red'} />
                                )}

                                <Text fontWeight={600}>Mobile</Text>
                                {mobile}
                            </SimpleGrid>
                        </Center>
                    </VStack>
                </HStack>
            </Container>
        </>
    );
};

function tConvert(time: any) {
    // Check correct time format and split into components
    time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        // to add space after time and AP/PM
        time[3] = ' ';
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
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

export default UserPage;
