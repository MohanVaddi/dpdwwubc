/* eslint-disable react-hooks/rules-of-hooks */
import { useState, ChangeEvent, useCallback, useContext } from 'react';
import {
    Button,
    VStack,
    Heading,
    Grid,
    GridItem,
    FormControl,
    Input,
    FormLabel,
    Text,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    SimpleGrid,
    ButtonGroup,
    useToast,
    ToastId,
    useColorModeValue,
} from '@chakra-ui/react';
import { SyntheticEvent } from 'react';
import {
    ArrowBackIcon,
    ArrowForwardIcon,
    CheckIcon,
    ChevronDownIcon,
    NotAllowedIcon,
} from '@chakra-ui/icons';
// import Image from 'next/image';
import type { NextPage } from 'next';
import Layout from './../../components/UI/Layout';
import { debounce } from 'lodash';
import Head from 'next/head';
import axios from 'axios';
import placeholder from './../../public/placeholder.png';
import { ProfileImg } from './ProfileImg';
import { SignupLayout } from './SignupLayout';
import { useRouter } from 'next/router';
import { UserContext } from '../../context/UserContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, firestore, googleAuthProvider } from '../../lib/firebase';
import { isDisabled } from '@chakra-ui/utils';
import { doc, getDoc, writeBatch } from 'firebase/firestore';

const usernameRegex = /^[a-zA-Z0-9]+$/;

const Home: NextPage = () => {
    const { user, userData } = useContext(UserContext);
    const Router = useRouter();
    const toast = useToast();

    const [gender, setGender] = useState('Select Gender');
    const [newusername, setNewUsername] = useState<string>();
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [usernameIsAvailable, setUsernameIsAvailable] = useState(false);

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

    const validate = (value: string) => {
        toast.closeAll();

        // set if the username is already taken
        // setUsernameIsTaken(true);

        if (value.length >= 6 && usernameRegex.test(value)) {
            toast({
                title: 'Valid Username.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setUsernameIsValid(true);
            return true;
        } else if (!(value.length >= 6)) {
            toast({
                title: 'Invalid Username.',
                description: 'Username must have atleast 6 characters.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            setUsernameIsValid(false);
            return false;
        } else if (!usernameRegex.test(value)) {
            toast({
                title: 'Invalid Username.',
                description:
                    'Username must contain alphabets and numbers only.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            setUsernameIsValid(false);
            return false;
        } else {
            setUsernameIsValid(false);
            return false;
        }
    };

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewUsername(value);

        // validate username
        if (validate(value)) {
            handleUsernameAvailability(value);
        }
    };

    const handleUsernameAvailability = useCallback(
        debounce(async (username: string) => {
            console.log(`Checking username avialability for : ${username}`);
            const ref = doc(firestore, `usernames/${username}`);
            const snapshot = await getDoc(ref);
            if (snapshot.exists()) {
                setUsernameIsAvailable(false);
            } else {
                setUsernameIsAvailable(true);
            }
        }, 500),
        []
    );

    const successTextColor = useColorModeValue('green', 'green.300');

    switch (step) {
        case 1:
            return (
                <SignupLayout>
                    <SimpleGrid columns={1} w='full' gap={6}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <InputGroup>
                                <Input
                                    onChange={handleUsername}
                                    name='username'
                                    type={'text'}
                                    value={newusername}
                                    variant={'filled'}
                                />
                                <InputRightElement>
                                    {usernameIsValid ? (
                                        <CheckIcon color='green.500' />
                                    ) : (
                                        <NotAllowedIcon color={'red.400'} />
                                    )}
                                </InputRightElement>
                            </InputGroup>
                            {usernameIsValid && usernameIsAvailable ? (
                                <Text align={'right'} color={successTextColor}>
                                    Username is Available
                                </Text>
                            ) : (
                                <Text
                                    textAlign={'right'}
                                    fontSize={'xs'}
                                    color='red'>
                                    No spaces, only alphabets and numbers are
                                    allowed.
                                </Text>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                name='email'
                                type={'email'}
                                variant={'filled'}
                            />
                        </FormControl>
                        {/* <SignInWithGoogle /> */}
                        <Button
                            {...(usernameIsValid && usernameIsAvailable
                                ? ''
                                : { disabled: true })}
                            fontSize={'md'}
                            fontWeight={400}
                            size={'md'}
                            rightIcon={<ArrowForwardIcon />}
                            variant='primary'
                            onClick={async () => {
                                const userDoc = doc(
                                    firestore,
                                    `users/${user!.uid}`
                                );
                                const usernameDoc = doc(
                                    firestore,
                                    `usernames/${newusername}`
                                );
                                const batch = writeBatch(firestore);
                                batch.set(userDoc, {
                                    username: newusername,
                                    photoURL: user!.photoURL,
                                    displayName: user!.displayName,
                                });
                                batch.set(usernameDoc, { uid: user!.uid });
                                await batch.commit();
                                // nextStep();
                            }}>
                            Continue
                        </Button>
                    </SimpleGrid>
                </SignupLayout>
            );
    }

    return (
        <>How do you get here</>

        /*     <Button
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
        */
    );
};

export default Home;

// function SignInWithGoogle() {
//     const googleSignIn = async () => {
//         try {
//             await signInWithPopup(auth, googleAuthProvider);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <Button onClick={googleSignIn} variant={'outline'}>
//             Sign In With Google
//         </Button>
//     );
// }

/* function Gender() {
    return (
        <FormControl>
            <FormLabel>Gender</FormLabel>
            <Menu>
                <MenuButton
                    w={'full'}
                    textAlign='left'
                    as={Button}
                    rightIcon={<ChevronDownIcon />}>
                    {gender}
                </MenuButton>
                <MenuList>
                    <MenuItem
                        onClick={(
                            e: SyntheticEvent<HTMLButtonElement, Event>
                        ) => {
                            setGender('Male');
                        }}>
                        Male
                    </MenuItem>
                    <MenuItem
                        onClick={(
                            e: SyntheticEvent<HTMLButtonElement, Event>
                        ) => {
                            setGender('Female');
                        }}>
                        Female
                    </MenuItem>
                    <MenuItem
                        onClick={(
                            e: SyntheticEvent<HTMLButtonElement, Event>
                        ) => {
                            setGender('Prefer Not to say');
                        }}>
                        Prefer Not to say
                    </MenuItem>
                </MenuList>
            </Menu>
        </FormControl>
    );
}
 */
function Name() {
    return (
        <>
            <GridItem w='100%'>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input name='firstName' type={'text'} variant={'filled'} />
                </FormControl>
            </GridItem>
            <GridItem w='100%'>
                <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input name='lastName' type={'text'} variant={'filled'} />
                </FormControl>
            </GridItem>{' '}
        </>
    );
}

function Mobile() {
    return (
        <GridItem w='100%'>
            <FormControl>
                <FormLabel>Mobile No.</FormLabel>
                <InputGroup>
                    <InputLeftAddon>+91</InputLeftAddon>
                    <Input
                        name='mobile'
                        type={'number'}
                        maxLength={10}
                        variant={'outline'}
                    />
                </InputGroup>
            </FormControl>
        </GridItem>
    );
}
