import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import customtheme from './../theme/theme';
import { css, Global } from '@emotion/react';
import 'focus-visible/dist/focus-visible';

function MyApp({ Component, pageProps }: AppProps) {
    
    const GlobalStyles = css`
        /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
        .js-focus-visible :focus:not([data-focus-visible-added]) {
            outline: none;
            box-shadow: none;
        }
    `;

    return (
        <>
            <Global styles={GlobalStyles} />
            <ChakraProvider theme={customtheme}>
                <ColorModeScript initialColorMode='light' />
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    );
}

export default MyApp;
