import { Button, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import profileImg from './../../public/logo.png';

const getLocation = () => {
    if (!navigator.geolocation) {
        console.log('This browser donot support Geolocation.');
    }
    navigator.geolocation.getCurrentPosition((location) => {
        console.log(location.coords);
    });
};

const ImageComponent = () => {
    return (
        <VStack w='full'>
            <Image
                src={profileImg}
                width='250px'
                height={'250px'}
                alt='profile image'
            />

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

export default ImageComponent;
