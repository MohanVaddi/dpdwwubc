import { Container } from '@chakra-ui/react';
import React from 'react';
import Header from './../../components/UI/Header';

export const Layout: React.FC = ({ children }) => (
    <>
        <Header />
        <Container
            w='full'
            maxW='container.md'
            h='100vh'
            pt={8}
            px={{ base: 6, md: 10, lg: 0 }}>
            {children}
        </Container>
    </>
);
