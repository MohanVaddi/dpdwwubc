import React, { Children } from 'react';
import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure,
} from '@chakra-ui/react';

const Overlay: React.FC = ({ children }) => (
    <ModalOverlay
        bg='white'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'>
        {children}
    </ModalOverlay>
);

const ModalDialog: React.FC = ({ children }) => {
    return (
        <>
            <Modal isOpen={true} onClose={() => {}}>
                <Overlay>
                    <Center w='full' h='full'>
                        {children}
                    </Center>
                </Overlay>
            </Modal>
        </>
    );
};

const LoadingModal: React.FC = () => {
    return (
        <ModalDialog>
            <Spinner thickness='4px' speed='0.65s' color='blue.500' size='xl' />
        </ModalDialog>
    );
};

export default LoadingModal;
