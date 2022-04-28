import {
    Button,
    Input,
    FormControl,
    FormLabel,
    Box,
    SimpleGrid,
    Center,
    HStack,
    CheckboxGroup,
    Checkbox,
} from '@chakra-ui/react';
import React, { useContext, useRef, useState } from 'react';
import AppContext, { User } from '../../context/AppContext';
import ProfileImgUp from './ProfileImgUp';
import { Select } from 'chakra-react-select';
import { professions } from '../../lib/config';
import { OpenToWork, WorkingDays } from '../../types/arbeit';

const OpenToWorkForm: React.FC<{}> = (): JSX.Element => {
    const ctx = useContext(AppContext);
    const [profession, setProfession] = useState<string>('');
    const [fromTime, setFromTime] = useState<string>('08:00');
    const [toTime, setToTime] = useState<string>('16:00');
    const [workingDays, setWorkingDays] = useState<WorkingDays[]>([
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
    ]);

    const submitHandler = (e: any) => {
        e.preventDefault();

        // const userObj: OpenToWork = {
        //     userId: ctx.state.user.userId,
        //     username: ctx.state.user.username,
        //     mobile: ctx.state.user.mobile,
        //     email: ctx.state.user.email,
        //     photoURL: ctx.state.user.photoURL,
        // };

        console.log();
        console.log('submitting successful');
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
                                value={workingDays}
                                onChange={(e) => {
                                    setWorkingDays(e as any);
                                }}>
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
                <Button variant={'primary'} type='submit'>
                    Open To Work
                </Button>
            </Box>
        </>
    );
};

export default OpenToWorkForm;
