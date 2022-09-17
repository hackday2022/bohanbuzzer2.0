import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import DangerousInformation from '../component/dangerousInformation'

export default function NotificationPage(props: any) {
  console.log(props)
  return (
    <div>
      <Container
        sx={{
          bgcolor: '#F9F9F9',
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
              <Typography variant="h2" component="h2">
                危険情報
              </Typography>
            </Box>
            <DangerousInformation />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
