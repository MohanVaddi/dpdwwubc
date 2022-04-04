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
        brand: {
            50: '#f5fee5',
            100: '#e1fbb2',
            200: '#cdf781',
            300: '#b8ee56',
            400: '#a2e032',
            500: '#8ac919',
            600: '#71ab09',
            700: '#578602',
            800: '#3c5e00',
            900: '#203300',
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
                        ringColor: 'brand.500',
                    },
                    color: mode('black', 'gray.800')(props),
                    backgroundColor: mode('white', 'brand.200')(props),
                    _hover: {
                        backgroundColor: mode('white', 'brand.300')(props),
                    },
                    _active: {
                        backgroundColor: mode('white', 'brand.400')(props),
                    },
                }),
                secondary: (props: any) => ({
                    // rounded: 'none',
                    _focus: {
                        ring: 2,
                        ringColor: 'black',
                    },
                    color: mode('white', 'gray.800')(props),
                    backgroundColor: mode('black', 'brand.200')(props),
                    _hover: {
                        backgroundColor: mode('black', 'brand.300')(props),
                    },
                    _active: {
                        backgroundColor: mode('black', 'brand.400')(props),
                    },
                }),
            },
        },

        Input: {
            variants: {
                default: {
                    field: {
                        _focus: {
                            borderColor: 'black',
                        },
                    },
                },
                filled: {
                    field: {
                        _focus: {
                            borderColor: 'black',
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
                            borderColor: 'black',
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
                        ringColor: 'black',
                    },
                },
            },
        },
    },
});

export default theme;
