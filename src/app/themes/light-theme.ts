import {createTheme} from "@mui/material";

import "@fontsource/comfortaa/latin-400.css";

export const theme = createTheme({
    typography: {
        fontFamily: '"Comfortaa"'
    },
    spacing: 10,
    breakpoints: {
        values: {
            xs: 450,
            sm: 768,
            md: 960,
            lg: 1200,
            xl: 1536
        }
    },
    palette: {
        mode: 'light',
        background: {
            default: '#ffffff',
            paper: '#f2f6f8',
        },
        primary: {
            main: '#05B3F0',
            contrastText: '#fff'
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: () => ({
                '::-webkit-scrollbar': {
                    width: '8px !important',
                },
                '::-webkit-scrollbar-track': {
                    background: theme.palette.background.paper,
                },
                '::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '2px',
                },
                '@-moz-document url-prefix()': {
                    body: {
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
                        scrollbarGutter: 'stable',
                    },
                },
                '& html, body, #root': {
                    maxWidth: '100vw',
                    overflow: 'hidden',
                    height: '100dvh',
                },
                body: {
                    margin: 0,
                },
                a: {
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                        color: 'inherit'
                    },
                }
            }),
        },
    }
})