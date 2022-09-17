import type { NextPage } from 'next'
import React, { useEffect } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import '../firebase/init'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CompleteButton from './component/completeButton'
import RegistrationProfile from './setup-method/registrationProfile'
import RegistrationDevice from './setup-method/registrationDevice'
import { useRouter } from 'next/router'
import { addParent } from '~/lib/addParent'
import { fetchSchools } from '~/lib/fetchSchools'

const Setup: NextPage = () => {
  const [page, setPage] = React.useState(0)
  const [name, setName] = React.useState('')
  const [area, setArea] = React.useState('')
  const [deviceName, setDeviceName] = React.useState('')
  const [deviceSchool, setDeviceSchool] = React.useState('')
  const [deviceSirial, setDeviceSirial] = React.useState('')
  const [schools, setSchools] = React.useState<{ id: string; name: string }[]>(
    []
  )

  const [fetchingSchools, setFetchingSchools] = React.useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setFetchingSchools(true)
        const schoolList = await fetchSchools()
        setSchools(schoolList)
        setDeviceSchool(schoolList[0].name)
        setFetchingSchools(false)
      } catch (e) {
        console.error(e)
        setFetchingSchools(false)
      }
    })()
  }, [])

  const handleCompletedButton = async () => {
    const schoolId = schools.find((school) => school.name === deviceSchool)?.id
    if (!schoolId) return

    await addParent(
      {
        name,
        area,
      },
      [
        {
          name: deviceName,
          deviceId: deviceSirial,
          schoolId: schoolId,
        },
      ]
    )

    router.push('/map')
  }

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
              zIndex: 1,
            }}
          >
            <CardContent>
              {page === 0 ? (
                <RegistrationProfile
                  name={name}
                  setName={setName}
                  area={area}
                  setArea={setArea}
                />
              ) : (
                <RegistrationDevice
                  title="デバイスの設定"
                  add={1}
                  deviceName={deviceName}
                  setDeviceName={setDeviceName}
                  deviceSirial={deviceSirial}
                  setDeviceSirial={setDeviceSirial}
                  deviceSchool={deviceSchool}
                  setDeviceSchool={setDeviceSchool}
                  schoolList={schools.map((school) => school.name)}
                  fetchingSchools={fetchingSchools}
                />
              )}
              <Box mb={2}>
                {page === 0 ? (
                  <CompleteButton
                    mode="light"
                    name="次へ"
                    onClick={() => setPage(1)}
                  />
                ) : (
                  <CompleteButton
                    mode="light"
                    name="完了"
                    onClick={handleCompletedButton}
                  />
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
                    onClick={() => router.back()}
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
