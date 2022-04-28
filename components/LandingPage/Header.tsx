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
    useToast,
    
} from '@chakra-ui/react';

import { useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { UserContext } from '../../context/UserContext';
import GoogleSvg from './../../public/google-color.svg'

const FramerButton = motion<ButtonProps>(Button);

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
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
                shadow='md'
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'start', md: 'start' }}>
                    <Image src={img} alt='Logo' width={40} height={40} />
                </Flex>
                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <SignInWithGoogle />
                </Stack>
            </Flex>
        </Box>
    );
};

function SignInWithGoogle() {
    const toast = useToast();
    const router = useRouter();

    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
        } catch (err) {
            console.error(err);
            toast({
                title: 'Error.',
                description: 'Unable to login using google.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <Button
            fontSize={'md'}
            fontWeight={400}
            colorScheme='blue'
            variant={'outline'}
            // color='blackAlpha'
            rightIcon={
                <Image
                    alt='google'
                    width={20}
                    height={20}
                    src={GoogleSvg}
                />
            }
            onClick={googleSignIn}>
            Sign In With
        </Button>
    );
}

export default Header;
