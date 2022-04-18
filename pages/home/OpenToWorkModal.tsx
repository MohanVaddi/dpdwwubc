import {
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { ProfileImgUp } from './ProfileImgUp';

export const OpenToWorkModal: React.FC<{}> = (): JSX.Element => {
    const [step, setStep] = useState<number>(0);
    const ctx = useContext(AppContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef<any>();
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const finalStep = 1;

    // go back to previous step
    const prevStep = () => {
        setStep((prevState) => {
            return prevState - 1;
        });
    };

    const nextStep = () => {
        setStep((prevState) => {
            return prevState + 1;
        });
    };

    const renderSwitch = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <ModalBody>
                        <ProfileImgUp />
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                value={ctx.state.user.username}
                                placeholder='Name'
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Email Id</FormLabel>
                            <Input
                                readOnly={true}
                                value={ctx.state.user.email}
                                placeholder='Email'
                            />
                        </FormControl>
                    </ModalBody>
                );
            case 1:
                return (
                    <ModalBody>
                        <ProfileImgUp />
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Email Id</FormLabel>
                            <Input
                                readOnly={true}
                                value={ctx.state.user.email}
                                placeholder='Email'
                            />
                        </FormControl>
                    </ModalBody>
                );
        }
    };

    return (
        <>
            <Button variant={'primary'} onClick={onOpen}>
                Change
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={initialRef}>
                <ModalOverlay />
                <form onSubmit={submitHandler}>
                    <ModalContent>
                        <ModalHeader>Open To Work</ModalHeader>
                        <ModalCloseButton />
                        {renderSwitch(step)}
                        <ModalFooter>
                            {step >= 1 ? (
                                <Button onClick={prevStep} variant='ghost'>
                                    Prev
                                </Button>
                            ) : (
                                <Button
                                    colorScheme='blue'
                                    mr={3}
                                    onClick={onClose}>
                                    Close
                                </Button>
                            )}
                            {step === finalStep ? (
                                <Button type='submit' variant='ghost'>
                                    Update
                                </Button>
                            ) : (
                                <Button onClick={nextStep} variant='ghost'>
                                    Next
                                </Button>
                            )}
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};
