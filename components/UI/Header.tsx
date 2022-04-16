import type { NextPage } from 'next';
import img from './../../public/logo.png';
import Image from 'next/image';
import NextLink from 'next/link';
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Stack,
    useColorMode,
    Center,
    IconButton,
    Heading,
    VStack,
    useColorModeValue,
    Spacer,
    useBreakpointValue,
    HStack,
    Link
} from '@chakra-ui/react';
import { auth } from '../../lib/firebase';
import { UserContext } from './../../context/UserContext';
import { useRouter } from 'next/router';
import { ReactNode, useContext } from 'react';

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        as={NextLink}
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

const Links = ['Dashboard', 'Projects', 'Team'];


const Header = () => {
    const router = useRouter();
    const { userData } = useContext(UserContext);
    console.log('UserData in Header',userData);
    const isMobile = useBreakpointValue({
        base: true,
        sm: true,
        md: false,
        lg: false,
    });

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                shadow='md'
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <HStack spacing={8} alignItems={'center'}>
                    <Image src={img} alt='logo' width={40} height={40} />

                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link) => (
                            <NavLink key={link}>{link}</NavLink>
                        ))}
                    </HStack>
                </HStack>
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
                    {/* <Link href={'/'}> */}
                    {/* </Link> */}
                    {/* </Text> */}
                    <Spacer />

                    {/* {isLoggedIn && ( */}
                    <Menu>
                        <Center
                            w='40px'
                            h='40px'
                            borderRadius={'full'}
                            bg='primary.500'
                            color='white'
                            _hover={{ bg: 'primary.600' }}>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={`${userData?.photoURL}`}
                                />
                            </MenuButton>
                        </Center>

                        <MenuList alignItems={'center'}>
                            <br />
                            <Center>
                                <Avatar
                                    size={'2xl'}
                                    src={`${userData?.photoURL}`}
                                />
                            </Center>
                            <br />
                            <Center>
                                <VStack spacing={2}>
                                    {/* <p>{state.user.name}</p>
                                        <p>
                                            {state.user.role.toLocaleUpperCase()}
                                        </p> */}
                                </VStack>
                            </Center>
                            <br />
                            <MenuDivider />
                            {/* <MenuItem>Your Servers</MenuItem> */}
                            {isMobile && (
                                <>
                                    <MenuItem>Find Work</MenuItem>
                                    <MenuItem>Post Work</MenuItem>
                                    <MenuItem>Search Profiles</MenuItem>
                                </>
                            )}
                            <MenuItem>Account Settings</MenuItem>
                            <MenuItem
                                onClick={() => {
                                    auth.signOut();
                                    router.push('/');
                                }}>
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    {/* )} */}
                </Flex>
            </Flex>
        </Box>
    );
};

// function SignOutButton() {
//     return (
//         <Button
//             variant={'primary'}
//             fontWeight='400'
//             onClick={() => {
//                 auth.signOut();
//                 router.push('/');
//             }}>
//             Sign Out
//         </Button>
//     );
// }

export default Header;
