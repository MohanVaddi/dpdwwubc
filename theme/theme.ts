import { extendTheme, theme as baseTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    styles: {
        global: {
            body: {
                lineBreak: 'auto',
                transition: 'all 0.4s ease-in-out',
            },
            code: {
                display: 'inline-flex',
                fontWeight: 'bold',
                fontSize: '0.85em',
                background: '#112130',
                transition: 'all 0.4s ease-in-out',
                padding: '0 6px',
                borderRadius: '5px',
            },
        },
    },
    colors: {
        primary: {
            50: '#e0e9fb',
            100: '#b3c8f4',
            200: '#9db8f1',
            300: '#86a8ee',
            400: '#7098eb',
            500: '#4378e5',
            600: '#1e5ad7',
            700: '#1b51c1',
            800: '#1848aa',
            900: '#11357e',
        },
    },
    fonts: {
        heading: `Montserrat, ${baseTheme.fonts.heading}`,
        body: `Inter, ${baseTheme.fonts.body}`,
    },
    components: {
        Button: {
            variants: {
                primary: (props: any) => ({
                    // rounded: 'none',
                    _focus: {
                        ring: 2,
                        ringColor: 'black',
                    },
                    color: mode('white', 'white')(props),
                    backgroundColor: mode('primary.500', 'primary.500')(props),
                    _hover: {
                        ring: 1,
                        ringColor: 'primary.700',
                        backgroundColor: mode(
                            'primary.500',
                            'primary.500'
                        )(props),
                    },
                    _active: {
                        backgroundColor: mode(
                            'primary.500',
                            'primary.500'
                        )(props),
                    },
                }),
            },
        },

        Input: {
            variants: {
                default: {
                    field: {
                        _focus: {
                            borderColor: 'primary.500',
                        },
                    },
                },
                filled: {
                    field: {
                        _focus: {
                            borderColor: 'primary.500',
                        },
                    },
                },
            },

            // sizes: {
            //     md: {
            //         field: {
            //             borderRadius: 'none',
            //         },
            //     },
            // },
        },
        Select: {
            variants: {
                filled: {
                    field: {
                        _focus: {
                            borderColor: 'primary.500',
                        },
                    },
                },
            },
            // sizes: {
            //     md: {
            //         field: {
            //             borderRadius: 'none',
            //         },
            //     },
            // },
        },
        Checkbox: {
            baseStyle: {
                control: {
                    _focus: {
                        ring: 2,
                        ringColor: 'primary.500',
                    },
                },
            },
        },
    },
});

export default theme;
