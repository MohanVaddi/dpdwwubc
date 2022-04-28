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
    Box,
    SimpleGrid,
    Center,
    HStack,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import ProfileImgUp from './ProfileImgUp';
import { Select } from 'chakra-react-select';
import { professions } from '../../lib/config';

const OpenToWorkForm: React.FC<{}> = (): JSX.Element => {
    const [step, setStep] = useState<number>(0);
    const ctx = useContext(AppContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [profession, setProfession] = useState<string>('');
    const [fromTime, setFromTime] = useState<string>('08:00');
    const [toTime, setToTime] = useState<string>('16:00');

    const initialRef = React.useRef<any>();
    const submitHandler = (e: any) => {
        e.preventDefault();
        console.log('submitting successful');
    };
    const finalStep = 1;

    // go back to previous step
    const prevStep = () => {
        setStep((prevState) => {
            return prevState - 1;
        });
    };

    // go back to next step
    const nextStep = () => {
        setStep((prevState) => {
            return prevState + 1;
        });
    };

    return (
        <>
            <Box
                as={'form'}
                onSubmit={submitHandler}
                w='full'
                textAlign={'right'}>
                <SimpleGrid columns={[1, 2]} w='full' mb={8}>
                    <Center w='full' h='full'>
                        <ProfileImgUp imgUrl={ctx.state.user.photoURL} />
                    </Center>
                    <Box px={[1, 8, 10]} w='full'>
                        <FormControl mt={4}>
                            <FormLabel>Name:</FormLabel>
                            <Input
                                ref={initialRef}
                                value={ctx.state.user.username}
                                placeholder='Name'
                                onChange={() => {}}
                            />
                        </FormControl>

                        <FormControl mt={6}>
                            <FormLabel>Email ID:</FormLabel>
                            <Input
                                readOnly={true}
                                value={ctx.state.user.email}
                                placeholder='Email'
                            />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Profession:</FormLabel>
                            <Select
                                onChange={(e) => {
                                    setProfession(e?.value as string);
                                }}
                                options={professions}
                            />
                        </FormControl>

                        <FormControl mt={6}>
                            <FormLabel>Available Week days:</FormLabel>
                            <CheckboxGroup
                                defaultValue={[
                                    'monday',
                                    'tuesday',
                                    'wednesday',
                                    'thursday',
                                    'friday',
                                ]}>
                                <SimpleGrid columns={3} spacing='2'>
                                    <Checkbox value='monday'>Monday</Checkbox>
                                    <Checkbox value='tuesday'>Tuesday</Checkbox>
                                    <Checkbox value='wednesday'>
                                        Wednesday
                                    </Checkbox>
                                    <Checkbox value='thursday'>
                                        Thursday
                                    </Checkbox>
                                    <Checkbox value='friday'>Friday</Checkbox>
                                    <Checkbox value='saturday'>
                                        Saturday
                                    </Checkbox>
                                    <Checkbox value='sunday'>Sunday</Checkbox>
                                </SimpleGrid>
                            </CheckboxGroup>
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Timings:</FormLabel>
                            <HStack w='full'>
                                <Input
                                    value={fromTime}
                                    type={'time'}
                                    onChange={(e) => {
                                        setFromTime(e.target.value);
                                    }}
                                />
                                <Input
                                    value={toTime}
                                    type={'time'}
                                    onChange={(e) => {
                                        setToTime(e.target.value);
                                    }}
                                />
                            </HStack>
                        </FormControl>
                    </Box>
                </SimpleGrid>
                <Button variant={'primary'} type='submit'>Open To Work</Button>
            </Box>
        </>
    );
};

export default OpenToWorkForm;
