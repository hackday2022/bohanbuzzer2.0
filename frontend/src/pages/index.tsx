import type { NextPage } from 'next'
import React from 'react'
// import Head from 'next/head'
import Image from 'next/image'
import '../firebase/init'
import GoogleLogin from '../auth/loginByGoogle'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Container from '@mui/material/Container'
import GoogleIcon from '@mui/icons-material/Google'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <Container
      sx={{
        bgcolor: 'background.default',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs={12}>
          <Box sx={{ mt: 20 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{ color: 'text.primary' }}
            >
              MIMAMORI
            </Typography>
          </Box>
          <Box sx={{ mt: 15 }}>
            <Fab
              onClick={() => GoogleLogin(router)}
              variant="extended"
              sx={{ bgcolor: 'white', textTransform: 'none' }}
            >
              {/* <GoogleIcon sx={{ mr: 1 }} /> */}
              <Image src="/g-logo.png" alt="" width={24} height={24} />
              <Box sx={{ px: 1 }}>
                <Typography variant="subtitle1">Googleでログイン</Typography>
              </Box>
            </Fab>
          </Box>
        </Grid>
      </Grid>
      <div className="tritangle"></div>
    </Container>
  )
}

export default Home
