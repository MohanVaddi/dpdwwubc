import { useState } from 'react';
import {
    Button,
    Container,
    Divider,
    HStack,
    Progress,
    Spacer,
    VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import type { NextPage } from 'next';
import profileImg from './../../public/EMPLOYE.png';
import Header from '../../components/UI/Header';
import PersonalDetails from './PersonalDetails';
import Layout from './Layout';
import AddressDetails from './AddressDetails';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import WorkDetails from './WorkDetails';
import ImageComponent from './Image';
import Location from './Location';
import Head from 'next/head';

const Home: NextPage = () => {
    const [step, setStep] = useState<number>(1);

    // proceed to the next step
    const nextStep = () => {
        setStep((prevState) => {
            return prevState + 1;
        });
    };
    // go back to previous step
    const prevStep = () => {
        setStep((prevState) => {
            return prevState - 1;
        });
    };

    switch (step) {
        case 1:
            return (
                <Layout>
                    <Head>
                        <title>Worker Registeration</title>
                        <meta
                            name='viewport'
                            content='initial-scale=1.0, width=device-width'
                        />
                    </Head>
                    <VStack w='full' spacing={10}>
                        <PersonalDetails />
                        <Divider />
                        <AddressDetails />
                    </VStack>
                    <HStack pt={10}>
                        <Progress value={0} size='xs' colorScheme='pink' />
                        <Spacer />
                        <Button
                            fontSize={'md'}
                            fontWeight={400}
                            size={'md'}
                            color={'black'}
                            rightIcon={<ArrowForwardIcon />}
                            variant='outline'
                            onClick={() => {
                                nextStep();
                            }}>
                            Continue
                        </Button>
                    </HStack>
                </Layout>
            );
        case 2:
            return (
                <Layout>
                    <Head>
                        <title>Worker Registeration</title>
                        <meta
                            name='viewport'
                            content='initial-scale=1.0, width=device-width'
                        />
                    </Head>
                    <WorkDetails />
                    <VStack w='full' align={'flex-start'} spacing={4} pt={16}>
                        <Progress
                            w='full'
                            value={25}
                            size='sm'
                            colorScheme={'blackAlpha'}
                        />
                        <HStack w='full' pt={10} alignItems='center'>
                            <Button
                                fontSize={'md'}
                                fontWeight={400}
                                size={'md'}
                                color={'black'}
                                leftIcon={<ArrowBackIcon />}
                                variant='outline'
                                onClick={() => {
                                    prevStep();
                                }}>
                                Previous
                            </Button>
                            <Spacer />
                            <Button
                                fontSize={'md'}
                                fontWeight={400}
                                size={'md'}
                                color={'black'}
                                rightIcon={<ArrowForwardIcon />}
                                variant='outline'
                                onClick={() => {
                                    nextStep();
                                }}>
                                Continue
                            </Button>
                        </HStack>
                    </VStack>
                </Layout>
            );

        case 3:
            return (
                <Layout>
                    <Head>
                        <title>Worker Registeration</title>
                        <meta
                            name='viewport'
                            content='initial-scale=1.0, width=device-width'
                        />
                    </Head>
                    <ImageComponent />
                    <VStack w='full' align={'flex-start'} spacing={4} pt={16}>
                        <Progress
                            w='full'
                            value={50}
                            size='sm'
                            colorScheme={'blackAlpha'}
                        />
                        <HStack w='full' pt={10} alignItems='center'>
                            {/* <Progress value={20} size='xs' colorScheme='pink' /> */}
                            <Button
                                fontSize={'md'}
                                fontWeight={400}
                                size={'md'}
                                color={'black'}
                                leftIcon={<ArrowBackIcon />}
                                variant='outline'
                                onClick={() => {
                                    prevStep();
                                }}>
                                Previous
                            </Button>
                            <Spacer />
                            <Button
                                fontSize={'md'}
                                fontWeight={400}
                                size={'md'}
                                color={'black'}
                                rightIcon={<ArrowForwardIcon />}
                                variant='outline'
                                onClick={() => {
                                    nextStep();
                                }}>
                                Continue
                            </Button>
                        </HStack>
                    </VStack>
                </Layout>
            );
        case 4:
            return (
                <Layout>
                    <Head>
                        <title>Worker Registeration</title>
                        <meta
                            name='viewport'
                            content='initial-scale=1.0, width=device-width'
                        />
                    </Head>
                    <Location />
                    <VStack w='full' align={'flex-start'} spacing={4} pt={16}>
                        <Progress
                            w='full'
                            value={50}
                            size='sm'
                            colorScheme={'blackAlpha'}
                        />
                        <HStack w='full' pt={10} alignItems='center'>
                            {/* <Progress value={20} size='xs' colorScheme='pink' /> */}
                            <Button
                                fontSize={'md'}
                                fontWeight={400}
                                size={'md'}
                                color={'black'}
                                leftIcon={<ArrowBackIcon />}
                                variant='outline'
                                onClick={() => {
                                    prevStep();
                                }}>
                                Previous
                            </Button>
                            <Spacer />
                            <Button
                                fontSize={'md'}
                                fontWeight={400}
                                size={'md'}
                                color={'black'}
                                rightIcon={<ArrowForwardIcon />}
                                variant='outline'
                                onClick={() => {
                                    nextStep();
                                }}>
                                Continue
                            </Button>
                        </HStack>
                    </VStack>
                </Layout>
            );
        default:
            break;
    }
    return (
        <>
            <Header />
            <Head>
                <title>Worker Registeration</title>
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />
            </Head>
            <Container
                w='full'
                maxW='container.lg'
                h='100vh'
                pt={8}
                px={{ base: 6, md: 10, lg: 0 }}></Container>
        </>
    );
};

// const ProfileImg: React.FC = () => {
//     return (
//         <GridItem
//             w='100%'
//             rowSpan={0}
//             padding={6}
//             align='center'
//             alignContent={'center'}>
//             <VStack>
//                 <Image src={profileImg} width='200px' height={'200px'} />
//                 <Button variant={'outline'} color='black'>
//                     CHOOSE
//                 </Button>
//             </VStack>
//         </GridItem>
//     );
// };

export default Home;
