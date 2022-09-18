import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Button, Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DangerousInformation from '../component/dangerousInformation'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CustomTextInput from '../component/customTextInput'
import CompleteButton from '../component/completeButton'
import CustomAutoComplete from '../component/customAutoComplete'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import CustomLargeTextInput from '../component/customLargeTextInput'
import { fetchMapWarnings, TweetWarning, Warning } from '~/lib/fetchWaning'
import { useOnSnapshot } from '~/lib/useOnSnapshot'
import { addWarning } from '~/lib/addWarning'
import { useUser } from '~/lib/useUser'
import { add } from 'date-fns'

const periods = {
  一週間: 7,
  一ヶ月: 30,
  三ヶ月: 90,
  半年: 180,
  一年: 365,
}

// TODO: as を使わない方法で
const periodsJa = Object.keys(periods) as (keyof typeof periods)[]

export type NotificationPageProps = {
  allWarnings: Warning[]
  deviceSchool: string
}

export default function NotificationPage({
  allWarnings,
  deviceSchool,
}: NotificationPageProps) {
  const [registrate, setRegistrate] = React.useState(0)
  const [dangeroustitle, setDangeroustitle] = React.useState('')
  const [dangerouserea, setDangerousarea] = React.useState('')
  const [dangerouscontent, setDangerouscontent] = React.useState('')
  const [dangeroustime, setDangeroustime] = React.useState(periodsJa[0])
  const { user } = useUser()

  const warnings = allWarnings
    ? allWarnings.filter((warning) => !('city' in warning))
    : null

  const handleRegistrateClick = async () => {
    if (!user) return

    const until = add(new Date(), { days: periods[dangeroustime] })

    await addWarning(
      dangeroustitle,
      dangerouserea,
      dangerouscontent,
      until,
      user.uid,
      'parent'
    )

    setRegistrate(0)
  }

  return (
    <div>
      <Container
        sx={{
          bgcolor: '#F9F9F9',
          width: '100%',
        }}
      >
        {registrate === 0 ? (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            sx={{ pb: 20 }}
          >
            <Grid item xs={12}>
              <Box sx={{ mt: 5, mb: 5 }}>
                <Typography variant="h2" component="h2">
                  危険情報
                </Typography>
                <IconButton
                  sx={{ float: 'right', color: '#333' }}
                  onClick={() => setRegistrate(1)}
                >
                  <AddCircleOutlineRoundedIcon
                    sx={{ float: 'right', color: '#333' }}
                  />
                </IconButton>
              </Box>
              {warnings?.map((warning, i) => {
                const prevWarning = warnings[i - 1]
                const date =
                  'tweet_time' in warning ? warning.tweet_time : warning.since
                const prevDate =
                  prevWarning == null
                    ? null
                    : 'tweet_time' in prevWarning
                    ? prevWarning.tweet_time
                    : prevWarning.since
                const showDate =
                  prevDate != null &&
                  date.toDateString() !== prevDate.toDateString()

                return (
                  <Box key={warning.id} mb={2}>
                    <DangerousInformation
                      date={
                        'tweet_time' in warning
                          ? warning.tweet_time
                          : warning.since
                      }
                      area={
                        Array.isArray(warning.title)
                          ? warning.title.join(', ')
                          : warning.title
                      }
                      content={warning.body}
                      resource={warning.source}
                      time=""
                      hideDate={!showDate}
                    />
                  </Box>
                )
              })}
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Grid item xs={12}>
              <Box sx={{ mt: 5, mb: 5 }}>
                <Typography variant="h2" component="h2">
                  危険情報の登録
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
                <CardContent sx={{ color: '#333' }}>
                  <Box my={3}>
                    <CustomTextInput
                      caption="タイトル"
                      placeholder="不審者情報"
                      onChange={(e: any) => setDangeroustitle(e.target.value)}
                    />
                  </Box>
                  <Box my={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <CustomTextInput
                          caption="場所"
                          placeholder="東京都渋谷区.."
                          onChange={(e: any) =>
                            setDangerousarea(e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Box mt={3}>
                          <Button
                            variant="outlined"
                            onClick={() => console.log('')}
                            sx={{
                              boxShadow: 'None',
                              border: '1px solid #C7C7C7',
                              borderRadius: '8px',
                              paddingTop: '12px',
                              paddingBottom: '8px',
                              paddingLeft: '15px',
                              width: '100%',
                            }}
                          >
                            <MapOutlinedIcon
                              sx={{
                                fontSize: 16,
                                marginRight: '10px',
                                marginBottom: '2px',
                                color: '#333333',
                              }}
                            />
                            <Typography
                              variant="subtitle1"
                              sx={{ color: 'text.secondary' }}
                            >
                              地図を開く
                            </Typography>
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <CustomLargeTextInput
                    caption="詳細"
                    placeholder="不審者情報"
                    value={dangerouscontent}
                    onChange={(e: any) => setDangerouscontent(e.target.value)}
                  />
                  <CustomAutoComplete
                    caption="警戒期間"
                    onChange={(e: any) => setDangeroustime(e.target.value)}
                    placeholder="1週間"
                    selectList={['1週間', '1ヶ月', '3ヶ月', '6ヶ月', '1年']}
                  />
                  <Box mt={4} mb={2}>
                    <CompleteButton
                      mode="light"
                      name="登録"
                      onClick={handleRegistrateClick}
                    />
                  </Box>
                  <CompleteButton
                    mode=""
                    name="キャンセル"
                    onClick={() => setRegistrate(0)}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  )
}
