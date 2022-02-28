import React from 'react';
import {
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    VStack,
} from '@chakra-ui/react';
export const AddressDetails = () => {
    return (
        <VStack w='full' align={'flex-start'} spacing={6}>
            <Heading fontSize={'xl'}>Address</Heading>
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
                        <FormLabel>Door No.</FormLabel>
                        <Input name='doorno' type={'text'} variant={'filled'} />
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>Street</FormLabel>
                        <Input name='street' type={'text'} variant={'filled'} />
                    </FormControl>
                </GridItem>

                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>Village/Town</FormLabel>
                        <Input name='town' type={'text'} variant={'filled'} />
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>City</FormLabel>
                        <Input name='city' type={'text'} variant={'filled'} />
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>District</FormLabel>
                        <Input
                            name='district'
                            type={'text'}
                            variant={'filled'}
                        />
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>State</FormLabel>
                        <Input name='state' type={'text'} variant={'filled'} />
                    </FormControl>
                </GridItem>
                <GridItem w='100%'>
                    <FormControl>
                        <FormLabel>PIN</FormLabel>
                        <Input
                            name='pincode'
                            type={'number'}
                            variant={'filled'}
                        />
                    </FormControl>
                </GridItem>
            </Grid>
        </VStack>
    );
};
