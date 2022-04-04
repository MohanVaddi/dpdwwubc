import type { NextPage } from 'next';
import img from './../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Box,
    Flex,
    Button,
    Stack,
    useColorModeValue,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    ButtonProps,
} from '@chakra-ui/react';

import { useRef } from 'react';

const FramerButton = motion<ButtonProps>(Button);

const Header: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                // maxW={''}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'start', md: 'start' }}>
                    {/* <Text
                        textAlign={useBreakpointValue({
                            base: 'center',
                            md: 'left',
                        })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}> */}
                    <Image
                        src={img}
                        alt='Picture of the author'
                        width={40}
                        height={40}
                    />
                    {/* </Text> */}
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <LoginModal />

                    <Link href={'/workersignup'} passHref>
                        <Button
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'md'}
                            fontWeight={400}
                            variant={'secondary'}
                            size={'md'}>
                            Register
                        </Button>
                    </Link>
                </Stack>
            </Flex>
        </Box>
    );
};

const LoginModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef<any>();

    return (
        <>
            <Button
                fontSize={'md'}
                fontWeight={400}
                variant={'outline'}
                onClick={onOpen}>
                Sign In
            </Button>

            <Modal
                closeOnOverlayClick={false}
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
                size='sm'
                // isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack
                            spacing={4}
                            px={{
                                base: '2',
                                md: '4',
                            }}
                            py={10}>
                            <FormControl id='email'>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    ref={initialRef}
                                    type='email'
                                    variant={'filled'}
                                />
                            </FormControl>
                            <FormControl id='password'>
                                <FormLabel>Password</FormLabel>
                                <Input type='password' variant={'filled'} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{
                                        base: 'column',
                                        sm: 'row',
                                    }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    {/* <Checkbox>Remember me</Checkbox> */}
                                    <Button variant={'link'} color={'black'}>
                                        Forgot password?
                                    </Button>
                                </Stack>
                                {/* <Button
                                        bg={'black'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'black',
                                        }}>
                                        Sign in
                                    </Button> */}
                            </Stack>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button> */}
                        <FramerButton
                            variant={'secondary'}
                            fontWeight={'100'}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}>
                            Log in
                        </FramerButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Header;
