import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import type { NextPage } from 'next';
import profileImg from './../../public/EMPLOYE.png';
import SignUpHeader from '../../components/WorkerSignup/SignUpHeader';

const Home: NextPage = () => {
    return (
        <>
            <SignUpHeader />
            <Container maxW={'container.lg'} h={'100vh'} p={0} pt='10'>
                {/* <VStack maxH={'100vh'} width='full' height='full'> */}
                <Grid
                    templateColumns='repeat(3, 1fr)'
                    // templateRows={'repeat(10,1fr)'}
                    gap={6}>
                    <GridItem
                        w='100%'
                        rowSpan={0}
                        padding={10}
                        align='center'
                        alignContent={'center'}>
                        <Image src={profileImg} />
                        <Button variant={'outline'} color='black'>
                            CHOOSE
                        </Button>
                    </GridItem>
                    <GridItem w='100%' colSpan={2}>
                        <Flex
                            w='full'
                            alignItems='center'
                            justifyContent='center'>
                            <Box
                                p={8}
                                bg={useColorModeValue('white', 'gray.800')}
                                // maxW='sm'
                                // borderWidth='1px'
                                // rounded='lg'
                                // shadow='lg'
                                position='relative'>
                                <Grid
                                    templateColumns='repeat(2, 1fr)'
                                    // templateRows={'repeat(10,1fr)'}
                                    gap={6}>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>First Name</FormLabel>
                                            <Input
                                                name='firstName'
                                                type={'text'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>Last Name</FormLabel>
                                            <Input
                                                name='lastName'
                                                type={'text'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>Age</FormLabel>
                                            <Input
                                                name='age'
                                                type={'number'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>Gender</FormLabel>
                                            <RadioGroup
                                            // onChange={setValue}
                                            // value={value}
                                            >
                                                <Stack
                                                    spacing={2}
                                                    direction='row'
                                                    alignItems={'center'}>
                                                    <Radio
                                                        colorScheme={'gray'}
                                                        value='1'>
                                                        Male
                                                    </Radio>
                                                    <Radio
                                                        colorScheme={'gray'}
                                                        value='2'>
                                                        Female
                                                    </Radio>
                                                    <Radio
                                                        colorScheme={'gray'}
                                                        value='3'>
                                                        Prefer not to say
                                                    </Radio>
                                                </Stack>
                                            </RadioGroup>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>First Name</FormLabel>
                                            <Input
                                                name='firstName'
                                                type={'text'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>First Name</FormLabel>
                                            <Input
                                                name='firstName'
                                                type={'text'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </Grid>
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem w='100%'></GridItem>
                    <GridItem w='100%' colSpan={2}>
                        <Flex
                            w='full'
                            alignItems='center'
                            justifyContent='center'>
                            <Box
                                p={8}
                                w='full'
                                bg={useColorModeValue('white', 'gray.800')}
                                // maxW='sm'
                                // borderWidth='1px'
                                // rounded='lg'
                                // shadow='lg'
                                position='relative'>
                                <Grid
                                    templateColumns='repeat(2, 1fr)'
                                    // templateRows={'repeat(10,1fr)'}
                                    gap={6}>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>Door No.</FormLabel>
                                            <Input
                                                name='doorno'
                                                type={'text'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>Street</FormLabel>
                                            <Input
                                                name='street'
                                                type={'text'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>

                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>Village/Town</FormLabel>
                                            <Input
                                                name='town'
                                                type={'number'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>City</FormLabel>
                                            <Input
                                                name='city'
                                                type={'number'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>District</FormLabel>
                                            <Input
                                                name='district'
                                                type={'text'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>State</FormLabel>
                                            <Input
                                                name='state'
                                                type={'text'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w='100%'>
                                        <FormControl>
                                            <FormLabel>PIN</FormLabel>
                                            <Input
                                                name='pincode'
                                                type={'number'}
                                                variant={'filled'}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </Grid>
                            </Box>
                        </Flex>
                    </GridItem>
                </Grid>
                {/* </VStack> */}
            </Container>
        </>
    );
};

export default Home;
