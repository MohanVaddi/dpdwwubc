import React from 'react';
import {
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    Select,
    Stack,
    VStack,
} from '@chakra-ui/react';
const WorkDetails: React.FC = () => {
    return (
        <VStack w='full' align={'flex-start'} spacing={6}>
            <Heading fontSize={'2xl'}>Work Details</Heading>
            <Grid
                w='full'
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(2, 1fr)',
                }}
                gap={6}>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>Profession</FormLabel>
                        <Select variant={'filled'}>
                            <option value={'none'} defaultChecked>
                                -- select --
                            </option>
                            <option value={'barber'}>Barber</option>
                            <option value={'carpenter'}>Carpenter</option>
                            <option value={'painter'}>Painter</option>
                            <option value={'mason'}>Mason</option>
                            <option value={'physical labour'}>
                                Physical Labour
                            </option>
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    {/* <FormControl>
                        <FormLabel>Street</FormLabel>
                        <Input name='street' type={'text'} variant={'filled'} />
                    </FormControl> */}
                </GridItem>

                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>Available Timings (From Time)</FormLabel>
                        <Input
                            name='fromTime'
                            type={'time'}
                            variant={'filled'}
                        />
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>To Time</FormLabel>
                        <Input name='toTime' type={'time'} variant={'filled'} />
                    </FormControl>
                </GridItem>

                <GridItem w='100%' colSpan={[1, 2]}>
                    <FormControl>
                        <FormLabel>Available Days</FormLabel>
                        <CheckboxGroup colorScheme='green' defaultValue={[]}>
                            <Stack
                                spacing={[1, 5]}
                                direction={['column', 'row']}>
                                <Checkbox value='monday'>Monday</Checkbox>
                                <Checkbox value='tuesday'>Tuesday</Checkbox>
                                <Checkbox value='wednesday'>Wednesday</Checkbox>
                                <Checkbox value='thursday'>Thursday</Checkbox>
                                <Checkbox value='friday'>Friday</Checkbox>
                                <Checkbox value='saturday'>Saturday</Checkbox>
                                <Checkbox value='sunday'>Sunday</Checkbox>
                            </Stack>
                        </CheckboxGroup>
                    </FormControl>
                </GridItem>
                {/* <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>State</FormLabel>
                        <Input name='state' type={'text'} variant={'filled'} />
                    </FormControl>
                </GridItem> */}
                {/* <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>PIN</FormLabel>
                        <Input
                            name='pincode'
                            type={'number'}
                            variant={'filled'}
                        />
                    </FormControl>
                </GridItem> */}
            </Grid>
        </VStack>
    );
};

export default WorkDetails;
