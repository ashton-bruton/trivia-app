import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00bcd4', // Teal for the pop of color
        },
        secondary: {
            main: '#ff4081', // Pink as an accent
        },
        background: {
            default: '#121212', // Dark background
            paper: '#1e1e1e',   // Slightly lighter for cards
        },
        text: {
            primary: '#ffffff', // White text
            secondary: '#b0bec5', // Muted text
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        body1: { fontSize: '1rem' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Rounded buttons
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    fontFamily: "'Roboto', Arial, sans-serif",
                    background: 'linear-gradient(135deg, #121212, #1e1e1e), url("/path-to-your-image.jpg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    color: '#ffffff',
                },
            },
        },
    },
});

export default darkTheme;
