import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppContextProvider } from '../context/AppContext';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import customtheme from './../theme/theme';
import { css, Global } from '@emotion/react';
import 'focus-visible/dist/focus-visible';
import '@fontsource/montserrat';
import '@fontsource/inter';
import { AnimatePresence } from 'framer-motion';
import { UserContext } from '../context/UserContext';
import { useUserData } from '../lib/hooks';
// import client from '../graphql/apollo-client';
import { useState } from 'react';
import { LocContextProvider } from '../context/LocContext';

function MyApp({ Component, pageProps }: AppProps) {
    const { user } = useUserData();

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
            <UserContext.Provider value={{ user: user || null }}>
                <AppContextProvider>
                    <LocContextProvider>
                        <ChakraProvider theme={customtheme}>
                            <ColorModeScript initialColorMode='light' />
                            <AnimatePresence
                                exitBeforeEnter
                                initial={false}
                                onExitComplete={() => window.scrollTo(0, 0)}>
                                <Component {...pageProps} />
                            </AnimatePresence>
                        </ChakraProvider>
                    </LocContextProvider>
                </AppContextProvider>
            </UserContext.Provider>
        </>
    );
}

export default MyApp;
