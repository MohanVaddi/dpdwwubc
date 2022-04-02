import { Button, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import profileImg from './../../public/EMPLOYE.png';

const getLocation = () => {
    if (!navigator.geolocation) {
        console.log('This browser donot support Geolocation.');
    }
    navigator.geolocation.getCurrentPosition((location) => {
        console.log(location.coords);
    });
};

export const ImageComponent = () => {
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
                <Button
                    variant={'outline'}
                    colorScheme={'blackAlpha'}
                    onClick={getLocation}>
                    Get Location
                </Button>
            </HStack>
        </VStack>
    );
};
