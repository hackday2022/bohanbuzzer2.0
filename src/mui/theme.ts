import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FB9156',
    },
    background: {
      default: '#FB9156',
    },
    text: {
      primary: '#ffffff',
      secondary: '#707070',
    },
  },
  typography: {
    fontFamily: [
      'Hind Vadodara',
      'Helvetica',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '36px',
      fontWeight: 700,
      textAlign: 'center',
    },
    subtitle1: {
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '16px',
      fontFamily: 'Helvetica',
    },
    subtitle2: {
      fontFamily: 'Helvetica',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '18px',
      color: '#707070',
    },
  },
})

export default theme