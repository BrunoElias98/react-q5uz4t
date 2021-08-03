/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { colors, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import typography from './typography';
import { softShadows, strongShadows } from './shadows';
import { THEMES } from '../constants';
import { Italic } from 'react-feather';

const baseConfig = {
    direction: 'ltr',
    typography,
    overrides: {
        MuiLinearProgress: {
            root: {
                borderRadius: 3,
                overflow: 'hidden'
            }
        },
        MuiListItemIcon: {
            root: {
                minWidth: 32
            }
        },
        MuiChip: {
            root: {
                backgroundColor: 'rgba(0,0,0,0.075)'
            }
        },
        MuiInputBase: {
            root: {
                backgroundColor: "#FFFFFF"
            },
            input: {
                '&::placeholder': {
                    opacity: 1,
                    color: colors.blueGrey[600]
                }
            }
        },
        MuiListItem: {
            button: {
                '&:hover': {
                    backgroundColor: 'transparent',
                    // color: '#ff006e',
                }
            },
        },
        MuiTypography: {
            gutterBottom: {
                marginBottom: "1em",
            },
        },
    },
    palette: {
        type: 'light',
        header: {
            primary: {
                background: '#ff006e',
            },
            secondary: {
                background: '#ff006e',
                text: '#FFF'
            }
        },
        footer: {
            root: {
                borderTop: '10px solid #ff006e'
            }
        },
        action: {
            active: colors.blueGrey[600]
        },
        background: {
            default: colors.common.white,
            dark: '#f4f6f8',
            paper: colors.common.white
        },
        primary: {
            main: colors.indigo[600]
        },
        secondary: {
            main: '#5850EC'
        },
        text: {
            primary: colors.blueGrey[900],
            secondary: colors.blueGrey[600]
        }
    },
    shadows: softShadows
};

const themeConfigs = [
    {
        name: THEMES.STORE,
        typography: {
            h1 : {
                color: colors.blueGrey[900],
            },
            h2 : {
                color: colors.blueGrey[900],
            },
            h3 : {
                color: colors.blueGrey[900],
            },
            h4 : {
                color: colors.blueGrey[900],
            },
            h5 : {
                color: colors.blueGrey[900],
            },
            h6 : {
                color: colors.blueGrey[900],
            },
        },
        shadows: softShadows,
        components: {
            page: {
                title1: {

                }
            },
            productCard: {
                priceOld: {
                    textDecoration: 'line-through',
                    fontSize: '1rem',
                    color: '#546e7a'
                },
                priceFinal: {
                    fontWeight: '500',
                    fontSize: '1.5rem',
                },
                discountTag: {
                    backgroundColor: '#e51b23'
                }
            },
            productView : {
                priceOld: {
                    textDecoration: 'line-through',
                    fontSize: '1rem',
                    color: '#546e7a'
                },
                priceFinal: {
                    fontWeight: '500',
                    fontSize: '2rem',
                },
                discountTag: {
                    backgroundColor: '#e51b23'
                },
                buttonAddToCart: {
                    backgroundColor: '#ff006e',
                    "&:hover": {
                        backgroundColor: "#ff006e"
                    }
                }
            },
        }
    },
    {
        name: THEMES.STORE,
        overrides: {
            MuiInputBase: {
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: colors.blueGrey[600]
                    }
                }
            },
            MuiListItem: {
                button: {
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#ff006e',
                    }
                },
            },
            MuiTypography: {
                body1: {
                    fontFamily: 'Source Sans Pro'
                }
            }
        },
        palette: {
            header: {
                root: {
                    background: '#464646',
                    text: '#FFF'
                },
                secondary: {
                    background: '#464646',
                    text: '#FFF'
                }
            },
            footer: {
                root: {
                    background: '#464646',
                },
                title: {
                    color: '#FFFFFF',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: 16,
                    paddingTop: 16,
                    paddingBottom: 16,
                },
                text: {
                    color: '#AAA',
                    fontSize: 14,
                },
                link: {
                    color: '#AAA',
                    fontSize: 14,
                },
            },
            content: {
                root: {

                },
                title1: {
                    fontSize: 48,
                    fontWeight: 500,
                    fontStyle: 'italic',
                },
                title2: {
                    fontSize: 24,
                    fontWeight: 500,
                    color: '#9f7841',
                    marginBottom: '1em'
                },
                text: {
                    color: '#9f7841',
                    marginBottom: '1em'
                }
            },

            type: 'dark',
            action: {
                active: 'rgba(255, 255, 255, 0.54)',
                hover: 'rgba(255, 255, 255, 0.04)',
                selected: 'rgba(255, 255, 255, 0.08)',
                disabled: 'rgba(255, 255, 255, 0.26)',
                disabledBackground: 'rgba(255, 255, 255, 0.12)',
                focus: 'rgba(255, 255, 255, 0.12)'
            },
            background: {
                default: '#f5eee6',
                dark: '#f5eee6',
                paper: '#FFFFFF'
            },
            primary: {
                main: colors.indigo[600]
            },
            secondary: {
                main: '#5850EC'
            },
            text: {
                primary: colors.blueGrey[900],
                secondary: colors.blueGrey[600]
            }
        },
        typography: {
            h1 : {
                color: colors.blueGrey[900],
            },
            h2 : {
                color: colors.blueGrey[900],
            },
            h3 : {
                color: colors.blueGrey[900],
            },
            h4 : {
                color: colors.blueGrey[900],
            },
            h5 : {
                color: colors.blueGrey[900],
            },
            h6 : {
                color: colors.blueGrey[900],
            },
        },
        shadows: softShadows,
        components: {
            page: {
                title1: {

                }
            },
            productCard: {
                priceOld: {
                    textDecoration: 'line-through',
                    fontSize: '1rem',
                    color: '#546e7a'
                },
                priceFinal: {
                    fontWeight: '500',
                    fontSize: '1.5rem',
                },
                discountTag: {
                    backgroundColor: '#e51b23'
                }
            },
            productView : {
                priceOld: {
                    textDecoration: 'line-through',
                    fontSize: '1rem',
                    color: '#546e7a'
                },
                priceFinal: {
                    fontWeight: '500',
                    fontSize: '2rem',
                },
                discountTag: {
                    backgroundColor: '#e51b23'
                },
                buttonAddToCart: {
                    backgroundColor: '#ff006e',
                    "&:hover": {
                        backgroundColor: "#ff006e"
                    }
                }
            },
        }
    },



    // {
    //     name: THEMES.LIGHT,
    //     overrides: {
    //         MuiInputBase: {
    //             input: {
    //                 '&::placeholder': {
    //                     opacity: 1,
    //                     color: colors.blueGrey[600]
    //                 }
    //             }
    //         }
    //     },
    //     palette: {
    //         type: 'light',
    //         action: {
    //             active: colors.blueGrey[600]
    //         },
    //         background: {
    //             default: colors.common.white,
    //             dark: '#f4f6f8',
    //             paper: colors.common.white
    //         },
    //         primary: {
    //             main: colors.indigo[600]
    //         },
    //         secondary: {
    //             main: '#5850EC'
    //         },
    //         text: {
    //             primary: colors.blueGrey[900],
    //             secondary: colors.blueGrey[600]
    //         }
    //     },
    //     shadows: softShadows
    // },
    // {
    //     name: THEMES.ONE_DARK,
    //     palette: {
    //         type: 'dark',
    //         action: {
    //             active: 'rgba(255, 255, 255, 0.54)',
    //             hover: 'rgba(255, 255, 255, 0.04)',
    //             selected: 'rgba(255, 255, 255, 0.08)',
    //             disabled: 'rgba(255, 255, 255, 0.26)',
    //             disabledBackground: 'rgba(255, 255, 255, 0.12)',
    //             focus: 'rgba(255, 255, 255, 0.12)'
    //         },
    //         background: {
    //             default: '#282C34',
    //             dark: '#1c2025',
    //             paper: '#282C34'
    //         },
    //         primary: {
    //             main: '#8a85ff'
    //         },
    //         secondary: {
    //             main: '#8a85ff'
    //         },
    //         text: {
    //             primary: '#e6e5e8',
    //             secondary: '#adb0bb'
    //         }
    //     },
    //     shadows: strongShadows
    // },
    // {
    //     name: THEMES.UNICORN,
    //     palette: {
    //         type: 'dark',
    //         action: {
    //             active: 'rgba(255, 255, 255, 0.54)',
    //             hover: 'rgba(255, 255, 255, 0.04)',
    //             selected: 'rgba(255, 255, 255, 0.08)',
    //             disabled: 'rgba(255, 255, 255, 0.26)',
    //             disabledBackground: 'rgba(255, 255, 255, 0.12)',
    //             focus: 'rgba(255, 255, 255, 0.12)'
    //         },
    //         background: {
    //             default: '#2a2d3d',
    //             dark: '#222431',
    //             paper: '#2a2d3d'
    //         },
    //         primary: {
    //             main: '#a67dff'
    //         },
    //         secondary: {
    //             main: '#a67dff'
    //         },
    //         text: {
    //             primary: '#f6f5f8',
    //             secondary: '#9699a4'
    //         }
    //     },
    //     shadows: strongShadows
    // }
];

export function createTheme(settings = {}, storeTheme = {}) {

    let themeConfig = themeConfigs.find((theme) => theme.name === settings.theme);

    themeConfig = storeTheme;

    if (!themeConfig) {
        console.warn(new Error(`The theme ${settings.theme} is not valid`));
        [themeConfig] = themeConfigs;
    }

    let theme = createMuiTheme(
        _.merge(
            {},
            baseConfig,
            themeConfig,
            { direction: settings.direction }
        )
    );

    if (settings.responsiveFontSizes) {
        theme = responsiveFontSizes(theme);
    }

    return theme;
}
