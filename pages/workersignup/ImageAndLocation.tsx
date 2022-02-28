import { Button, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import profileImg from './../../public/EMPLOYE.png';

export const ImageAndLocation = () => {
    return (
        <VStack w='full'>
            <Image src={profileImg} width='250px' height={'250px'} />

            <HStack>
                <Button variant={'outline'} color='black'>
                    Take Photo
                </Button>
                <Button variant={'outline'} color='black'>
                    Upload
                </Button>
            </HStack>
        </VStack>
    );
};