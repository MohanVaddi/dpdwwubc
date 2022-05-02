import { Button, GridItem, Box, VStack, Image } from '@chakra-ui/react';
import { useFilePicker } from 'use-file-picker';
import React from 'react';

interface ProfileImgUpProps {
    imgUrl?: string;
}

const ProfileImgUp: React.FC<ProfileImgUpProps> = ({
    imgUrl = '/placeholders/placeholder2.png',
}) => {
    const [
        openFileSelector,
        { filesContent, loading, errors, plainFiles, clear },
    ] = useFilePicker({
        multiple: false,
        readAs: 'DataURL',

        // accept: '.ics,.pdf',
        accept: 'image/*',
        limitFilesConfig: { max: 1 },
        // minFileSize: 1, // in megabytes
        maxFileSize: 1,
        // maxImageHeight: 1024, // in pixels
        // minImageHeight: 1024,
        // maxImageWidth: 768,
        // minImageWidth: 768
        // readFilesContent: false, // ignores file content
    });

    if (errors.length) {
        return (
            <>
                {errors[0].fileSizeToolarge && 'File size is too large!'}
                {errors[0].readerError && 'Problem occured while reading file!'}
            </>
        );
    }

    console.log(imgUrl)

    return (
        <GridItem
            w='100%'
            rowSpan={0}
            // padding={6}
            alignContent={'center'}>
            <VStack>
                <Box borderRadius={'50%'}>
                    {!!filesContent.length ? (
                        <Image
                            width='300px'
                            height={'300px'}
                            rounded={'5px'}
                            referrerPolicy='no-referrer'
                            alt='profile image'
                            src={filesContent[0].content}
                        />
                    ) : (
                        <Image
                            alt='profile image'
                            rounded={'5px'}
                            src={imgUrl}
                            width='300px'
                            height={'300px'}
                            referrerPolicy='no-referrer'
                        />
                    )}
                </Box>
                {/* {plainFiles.map((file) => (
                    <div key={file.name}>{file.name}</div>
                ))} */}
                {plainFiles.length === 0 && (
                    <Button
                        onClick={() => openFileSelector()}
                        isLoading={loading}
                        loadingText='Uploading'
                        variant={'outline'}>
                        Upload
                    </Button>
                )}
                {plainFiles.length > 0 && (
                    <Button
                        onClick={() => {
                            clear();
                        }}
                        isLoading={loading}
                        loadingText='removing'
                        variant={'outline'}>
                        Remove
                    </Button>
                )}
            </VStack>
        </GridItem>
    );
};

export default ProfileImgUp;
