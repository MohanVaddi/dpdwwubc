import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import customtheme from './../theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={customtheme}>
            <ColorModeScript initialColorMode='light' />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
