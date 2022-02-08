import type { NextPage } from 'next';
import img from './../../public/EMPLOYE.png';
import Image from 'next/image';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

const SignUpHeader: NextPage = () => {
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
                    <Image
                        src={img}
                        alt='Picture of the author'
                        width={40}
                        height={40}
                    />
                    {/* </Text> */}
                </Flex>
            </Flex>
        </Box>
    );
};

export default SignUpHeader;
