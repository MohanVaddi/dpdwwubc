import { Button, VStack, GridItem, Box, Image } from '@chakra-ui/react';
import { useFilePicker } from 'use-file-picker';

const ProfileImg: React.FC = ({}) => {
    const [openFileSelector, { filesContent, loading, errors, plainFiles }] =
        useFilePicker({
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

    return (
        <GridItem
            w='100%'
            rowSpan={0}
            // padding={6}
            align='center'
            alignContent={'center'}>
            <VStack>
                <Box borderRadius={'50%'}>
                    {!!filesContent.length ? (
                        <Image
                            width='200px'
                            height={'200px'}
                            rounded={'full'}
                            alt='profile image'
                            src={filesContent[0].content}
                        />
                    ) : (
                        <Image
                            alt='profile image'
                            rounded={'full'}
                            src={'/placeholders/pfpplaceholder.png'}
                            width='200px'
                            height={'200px'}
                        />
                    )}
                </Box>
                {plainFiles.map((file) => (
                    <div key={file.name}>{file.name}</div>
                ))}
                <Button
                    onClick={() => openFileSelector()}
                    isLoading={loading}
                    loadingText='Uploading'
                    variant={'primary'}>
                    CHOOSE
                </Button>
            </VStack>
        </GridItem>
    );
};

export default ProfileImg;
