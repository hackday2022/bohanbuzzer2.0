import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import '../firebase/init'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../mui/theme'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  // const [userAuth, setuserAuth] = React.useState(0)
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
