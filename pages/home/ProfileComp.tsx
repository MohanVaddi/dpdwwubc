import {
    Center,
    SimpleGrid,
    Text,
    Flex, VStack, Image
} from '@chakra-ui/react';
import React from 'react';
import { UserInterface } from '../../types/arbeit'; 

const ProfileComp: React.FC<{ user: UserInterface; }> = ({ user }) => {
    let newPhotoUrl: string = '';
    if (user) {
        if (user.photoURL) {
            const photoUrl = user.photoURL!.split('=');
            newPhotoUrl = `${photoUrl[0]}=s300`;
        }
        console.log('user in photo exist,', user);
    } 
    return (
        <>
            <Flex w='full' h='full'>
                <SimpleGrid
                    h='full'
                    w='full'
                    columns={[1, 1, 2]}
                    gap={[6, 6, 0, 0]}
                    spacing={6}>
                    <Center w='full' h='full'>
                        <Image
                            w='200px'
                            h='200px'
                            alt={'profile picture'}
                            referrerPolicy='no-referrer'
                            src={newPhotoUrl as string}
                            rounded='full' />
                    </Center>
                    <VStack
                        w='full'
                        h='full'
                        textAlign={{
                            base: 'center',
                            sm: 'center',
                            md: 'left',
                        }}>
                        <Text
                            fontSize={'3xl'}
                            fontWeight='900'
                            color='primary.500'
                            w='full'>
                            {user?.username}
                        </Text>
                        <Text fontWeight='500' fontSize={'md'} w='full'>
                            {user?.email}
                        </Text>
                        {user && user.isMobileVerified ? (
                            <Text fontWeight='500' fontSize={'sm'} w='full'>
                                {user.mobile}
                            </Text>
                        ) : (
                            <Text fontSize={'sm'} color='gray.500' w='full'>
                                Phone Number not verified
                            </Text>
                        )}
                    </VStack>
                </SimpleGrid>
            </Flex>
        </>
    );
};
export default ProfileComp