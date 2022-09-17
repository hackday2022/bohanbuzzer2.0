import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import ErrorIcon from '@mui/icons-material/Error'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'

export default function DangerousInformationInMap(props: any) {
  return (
    <div>
      {props.show == 1 ? (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          sx={{ zIndex: 100 }}
        >
          <Card
            sx={{
              width: '90vw',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
              borderRadius: '24px 24px 0px 0px',
              bottom: '0px',
              position: 'fixed',
              zIndex: 1,
            }}
          >
            <CardContent sx={{ textAlign: 'left' }}>
              <ErrorIcon sx={{ color: '#FF6464', fontSize: '27px' }} />
              <Typography
                variant="h2"
                sx={{
                  ml: 1,
                  pb: 1,
                  display: 'inline',
                  verticalAlign: '5px',
                  color: '#333333',
                }}
              >
                {props.time}
              </Typography>
              <IconButton
                sx={{
                  float: 'right',
                  color: '#333',
                  position: 'absolute',
                  right: '0px',
                  top: '13px',
                }}
                onClick={() => props.show_func(0)}
              >
                <CancelOutlinedIcon
                  sx={{
                    color: '#333333',
                    fontSize: '20px',
                    float: 'right',
                    marginRight: '15px',
                  }}
                />
              </IconButton>
              <Box ml={1}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: '5px',
                    verticalAlign: '8px',
                    color: 'text.secondary',
                  }}
                >
                  {props.content}
                </Typography>
                <Box mt={2}>
                  <PlaceOutlinedIcon
                    sx={{ color: 'text.secondary', fontSize: '16px' }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      ml: 1,
                      verticalAlign: '3px',
                      color: 'text.secondary',
                    }}
                  >
                    {props.area}
                  </Typography>
                  <Box mt={0}>
                    <LanguageRoundedIcon
                      sx={{ color: 'text.secondary', fontSize: '16px' }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        ml: 1,
                        verticalAlign: '3px',
                        color: 'text.secondary',
                      }}
                    >
                      データ提供元： {props.resource}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
    </div>
  )
}
