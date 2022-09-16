import type { NextPage } from 'next'
import React, { useEffect } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import '../firebase/init'
import { GoogleLogin } from '../auth/googleLogin'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { CardHeader, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CustomTextInput from './component/customTextInput'
import CompleteButton from './component/completeButton'
import CustomAutoComplete from './component/customAutoComplete'
import RegistrationProfile from '../setup-method/registrationProfile'
import RegistrationDevice from '../setup-method/registrationDevice'

const Setup: NextPage = () => {
  const [page, setPage] = React.useState(0)
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
          <Box sx={{ mt: 5, mb: 5 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{ color: 'text.primary' }}
            >
              MIMAMORI
            </Typography>
          </Box>
          <Card
            sx={{
              width: '90vw',
              height: '100vh',
              boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '24px 24px 0px 0px',
            }}
          >
            <CardContent>
              {page === 0 ? <RegistrationProfile /> : <RegistrationDevice />}
              <Box mb={2}>
                {page === 0 ? (
                  <CompleteButton
                    mode="light"
                    name="次へ"
                    onClick={() => setPage(1)}
                  />
                ) : (
                  <CompleteButton mode="light" name="完了" onClick={null} />
                )}
              </Box>
              <Box mb={2}>
                {page === 1 ? (
                  <CompleteButton
                    mode=""
                    name="戻る"
                    onClick={() => setPage(0)}
                  ></CompleteButton>
                ) : (
                  <CompleteButton
                    mode=""
                    name="戻る"
                    onClick=""
                  ></CompleteButton>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className="tritangle"></div>
    </Container>
  )
}

export default Setup
