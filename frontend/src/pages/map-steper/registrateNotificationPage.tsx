import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'

export default function registrateNotificationPage(props: any) {
  return (
    <div>
      <Container
        sx={{
          bgcolor: '#F9F9F9',
          width: '100%',
          height: '100vh',
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item xs={12}>
            <Box sx={{ mt: 5, mb: 2 }}>
              <Typography variant="h2" component="h2">
                危険情報
              </Typography>
            </Box>
            <Card
              sx={{
                width: '90vw',
                height: '100vh',
                boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '24px 24px 0px 0px',
                zIndex: 1,
              }}
            >
              <CardContent></CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
