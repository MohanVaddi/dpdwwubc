import Layout from '../../components/UI/Layout';
import Head from 'next/head';
import { VStack, SimpleGrid } from '@chakra-ui/react';

export const SignupLayout: React.FC = ({ children }) => {
    return (
        <Layout maxw={'container.md'}>
            <Head>
                <title>Signup</title>
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />
            </Head>
            <VStack w='full' spacing={10} align='flex-start'>
                <SimpleGrid columns={[1,1,2,2]} w='full' gap={6}>
                    {children}
                </SimpleGrid>
            </VStack>
        </Layout>
    );
};
