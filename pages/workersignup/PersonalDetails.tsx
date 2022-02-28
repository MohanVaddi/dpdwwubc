import React from 'react';
import {
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Radio,
    RadioGroup,
    Stack,
    VStack,
    Text,
    Heading,
} from '@chakra-ui/react';

export const PersonalDetails: React.FC = () => {
    return (
        <VStack w='full' align={'flex-start'} spacing={6}>
            <Heading fontSize={'2xl'}>Personal Information</Heading>
            <Grid
                w='full'
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(2, 1fr)',
                }}
                // templateRows={'repeat(10,1fr)'}
                gap={6}>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            name='firstName'
                            type={'text'}
                            variant={'filled'}
                        />
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            name='lastName'
                            type={'text'}
                            variant={'filled'}
                        />
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>Age</FormLabel>
                        <Input name='age' type={'number'} variant={'filled'} />
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                        // onChange={setValue}
                        // value={value}
                        >
                            <Stack
                                spacing={2}
                                direction='row'
                                alignItems={'center'}>
                                <Radio colorScheme={'gray'} value='1'>
                                    Male
                                </Radio>
                                <Radio colorScheme={'gray'} value='2'>
                                    Female
                                </Radio>
                                <Radio colorScheme={'gray'} value='3'>
                                    Prefer Not to Say
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </GridItem>
                {/* <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            name='firstName'
                            type={'text'}
                            variant={'filled'}
                        />
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            name='firstName'
                            type={'text'}
                            variant={'filled'}
                        />
                    </FormControl>
                </GridItem> */}
            </Grid>
        </VStack>
    );
};
