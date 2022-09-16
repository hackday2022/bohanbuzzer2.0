import type { NextPage } from 'next'
import React from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import '../firebase/init'
import GoogleLogin from '../auth/loginByGoogle'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import FaceIcon from '@mui/icons-material/Face'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { useRouter } from 'next/router'

const Signin: NextPage = () => {
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
        sx={{ zIndex: 100 }}
      >
        <Grid item xs={12} sx={{ zIndex: 100 }}>
          <Box sx={{ mt: 20 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{ color: 'text.primary' }}
            >
              MIMAMORI
            </Typography>
          </Box>
          <Box sx={{ mt: 10, width: '209px', height: '55px' }}>
            <Fab
              onClick={() => router.push('/setup')}
              variant="extended"
              className="login-chip"
              sx={{ bgcolor: 'white', textTransform: 'none' }}
            >
              <FaceIcon sx={{ mr: 1 }} />
              <Box sx={{ pl: 1, pr: 4 }}>
                <Typography variant="subtitle1">保護者の方</Typography>
              </Box>
              <ArrowForwardRoundedIcon />
            </Fab>
          </Box>
          <Box sx={{ mt: 3, width: '209px', height: '55px' }}>
            <Fab
              onClick={() => router.push('/setup')}
              variant="extended"
              className="login-chip"
              sx={{ bgcolor: 'white', textTransform: 'none' }}
            >
              <SchoolIcon sx={{ mr: 1 }} />
              <Box sx={{ px: 1 }}>
                <Typography variant="subtitle1">学校関係者の方</Typography>
              </Box>
              <ArrowForwardRoundedIcon />
            </Fab>
          </Box>
        </Grid>
      </Grid>
      <div className="tritangle"></div>
    </Container>
  )
}

export default Signin
