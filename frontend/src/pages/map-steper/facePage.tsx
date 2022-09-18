import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CompleteButton from '../component/completeButton'
import Custom2wayTextInput from '../component/custom2waychangeTextInput'
import RegistrationDevice from '../setup-method/registrationDevice'
import { prefectures } from '~/lib/const'

export default function FacePage(props: any) {
  const [registrate, setRegistrate] = React.useState(0)
  const [childname, setChildname] = React.useState('')
  const [childarea, setChildarea] = React.useState('')
  const [deviceName, setDeviceName] = React.useState('')
  const [deviceSchool, setDeviceSchool] = React.useState('')
  const [deviceSirial, setDeviceSirial] = React.useState('')
  return (
    <div>
      <Container
        sx={{
          bgcolor: '#F9F9F9',
          width: '100%',
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Box sx={{ mt: 5, mb: 5 }}>
              <Typography align="center" variant="h2" component="h2">
                見守り設定
                {registrate === 0 ? (
                  <IconButton
                    sx={{
                      float: 'right',
                      color: '#333',
                      position: 'absolute',
                      right: '19px',
                      top: '32px',
                    }}
                    onClick={() => setRegistrate(1)}
                  >
                    <AddCircleOutlineRoundedIcon
                      sx={{ float: 'right', color: '#333' }}
                    />
                  </IconButton>
                ) : null}
              </Typography>
            </Box>
          </Grid>
          {registrate === 0 ? (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
              sx={{ pb: 20 }}
            >
              <Grid item xs={12}>
                <Custom2wayTextInput
                  caption1="あなたのお名前"
                  caption2="居住地域"
                  placeholder1="見守り太郎"
                  placeholder2="那覇"
                  listitem={prefectures}
                  onChange1={setChildname}
                  onChange2={setChildarea}
                />
                <Box my={3}>
                  <Custom2wayTextInput
                    caption1="あなたのお名前"
                    caption2="居住地域"
                    placeholder1="見守り太郎"
                    placeholder2="那覇"
                    listitem={prefectures}
                    onChange1={setChildname}
                    onChange2={setChildarea}
                    name="太郎"
                  />
                </Box>
              </Grid>
              <CompleteButton
                className="mimamori_setting_add_button"
                name="デバイスを追加する"
                onClick={() => setRegistrate(1)}
              />
              <Box mb={4}>
                <Typography> </Typography>
              </Box>
            </Grid>
          ) : (
            <Card
              sx={{
                position: 'fixed',
                bottom: 0,
                width: '90vw',
                height: '85dvh',
                boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '24px 24px 0px 0px',
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              <CardContent>
                <RegistrationDevice
                  title="デバイスの追加"
                  deviceName={deviceName}
                  setDeviceName={setDeviceName}
                  deviceSirial={deviceSirial}
                  setDeviceSirial={setDeviceSirial}
                  deviceSchool={deviceSchool}
                  setDeviceSchool={setDeviceSchool}
                />
                <Box mt={4}>
                  <CompleteButton
                    mode="light"
                    name="完了"
                    onClick={() => setRegistrate(0)}
                  />
                  <Box mt={2}>
                    <CompleteButton
                      name="戻る"
                      onClick={() => setRegistrate(0)}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Container>
    </div>
  )
}
