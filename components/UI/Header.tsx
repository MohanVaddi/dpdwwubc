import type { NextPage } from 'next';
import img from './../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

const Header = () => {
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
                    {/* <Link href={'/'}> */}
                    <Image src={img} alt='logo' width={40} height={40} />
                    {/* </Link> */}
                    {/* </Text> */}
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
