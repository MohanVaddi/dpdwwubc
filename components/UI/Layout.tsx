import { Container } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Header from '../../components/UI/Header';
import { motion } from 'framer-motion';
type Props = {
    children: ReactNode;
    title?: string;
    description?: string;
    padding?:
        | number[]
        | { base?: number; sm?: number; md?: number; lg?: number };
    maxw?:
        | 'container.sm'
        | 'container.md'
        | 'container.lg'
        | 'container.xl'
        | number
        | string;
};

const variants = {
    hidden: { opacity: 0, x: -50, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
};

const Layout: React.FC<Props> = ({ children, maxw: maxWid }) => (
    <>
        <Header />
        <Container
            w='full'
            maxW={maxWid ? maxWid : 'container.xl'}
            // h='100vh'
            pt={8}
            px={{ base: 6, md: 10, lg: 0 }}>
            <motion.main
                initial='hidden'
                animate='enter'
                exit='exit'
                variants={variants}
                transition={{ type: 'linear' }}
                className='
                    flex flex-col items-start w-full pt-10
                    px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96
                    pt-24 h-full
                '>
                {children}
            </motion.main>
        </Container>
    </>
);

export default Layout;
