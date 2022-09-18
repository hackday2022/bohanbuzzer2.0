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
import Avatar from '@mui/material/Avatar'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CompleteButton from './completeButton'

export default function DangerousInformationInMap(props: any) {
  const [show, setShow] = React.useState(1)
  return (
    <div>
      {show == 1 ? (
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
            <CardContent sx={{ textAlign: 'center', pt: 8 }}>
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
                onClick={() => setShow(0)}
              >
                <KeyboardArrowDownIcon
                  sx={{
                    color: '#333333',
                    fontSize: '20px',
                    float: 'right',
                    marginRight: '15px',
                  }}
                />
              </IconButton>
              <Box mt={4} mb={4}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                  sx={{ zIndex: 1 }}
                >
                  <Avatar
                    alt="細川"
                    src="./png"
                    sx={{
                      align: 'center',
                      width: 72,
                      height: 72,
                      boxShadow: 'inset 0 0 5px 2px #fff',
                      filter: 'drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.3))',
                      border: 'white 50px',
                    }}
                  />
                </Grid>
              </Box>

              <Box>
                <IconButton
                  sx={{
                    float: 'right',
                    position: 'absolute',
                    right: '16%',
                  }}
                  onClick={() => console.log('W')}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mt: '5px',
                    verticalAlign: '8px',
                    color: '#333',
                  }}
                >
                  {props.adress}
                </Typography>
                <Box mt={1}>
                  <Typography
                    variant="caption"
                    sx={{
                      mt: '10px',
                      verticalAlign: '8px',
                      color: '#707070',
                    }}
                  >
                    {props.latlng}
                  </Typography>
                </Box>
                <Box
                  mx="auto"
                  mt={1}
                  mb={7}
                  sx={{ width: '60%', textAlign: 'center' }}
                >
                  <CompleteButton
                    className="alert_completeButton"
                    name="GoogleMapで見る"
                    onClick={() => null}
                  />
                </Box>
                <Box mt={2}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      verticalAlign: '3px',
                      color: '#333',
                    }}
                  >
                    発信時刻
                  </Typography>
                  <Box mt={1} mb={5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        verticalAlign: '3px',
                        color: '#333',
                      }}
                    >
                      {props.alerttime}
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
