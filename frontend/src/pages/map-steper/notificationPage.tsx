import React from 'react'
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

export default function NotificationPage(props: any) {
  const [registrate, setRegistrate] = React.useState(0)
  const [dangeroustitle, setDangeroustitle] = React.useState('')
  const [dangerouserea, setDangerousarea] = React.useState('')
  const [dangerouscontent, setDangerouscontent] = React.useState('')
  const [dangeroustime, setDangeroustime] = React.useState('')
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
              <DangerousInformation
                date="2月14日"
                area="国会議事堂"
                content="痴漢事案およびストーカー事案。近くのPD至急対応に当たれ。"
                resource="警視庁"
                time="3時ごろ"
              />
              <Box mt={2}>
                <DangerousInformation
                  date=""
                  area="国会議事堂"
                  content="痴漢事案およびストーカー事案。近くのPD至急対応に当たれ。"
                  resource="警視庁"
                  time="3時ごろ"
                />
              </Box>
              <Box mt={2}>
                <DangerousInformation
                  date=""
                  area="国会議事堂"
                  content="痴漢事案およびストーカー事案。近くのPD至急対応に当たれ。"
                  resource="警視庁"
                  time="3時ごろ"
                />
              </Box>
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
                      onChange={setDangeroustitle}
                    />
                  </Box>
                  <Box my={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <CustomTextInput
                          caption="場所"
                          placeholder="東京都渋谷区.."
                          onChange={setDangerousarea}
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
                  />
                  <CustomAutoComplete
                    caption="警戒期間"
                    value={props.deviceSchool}
                    onChange={setDangeroustime}
                    placeholder="1週間"
                    selectList={['1週間', '1ヶ月', '3ヶ月', '6ヶ月', '1年']}
                  />
                  <Box mt={4} mb={2}>
                    <CompleteButton
                      mode="light"
                      name="登録"
                      onClick={() => setRegistrate(0)}
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
