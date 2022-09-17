import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CustomTextInput from './customTextInput'
import CustomAutoComplete from './customAutoComplete'
import { Button, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

export default function Custom2wayTextInput(props: any) {
  const [edit, setEdit] = React.useState(0)
  const [edit2, setEdit2] = React.useState(0)
  return (
    <div>
      <Card
        sx={{
          width: '90vw',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
          borderRadius: '24px',
          zIndex: 1,
        }}
      >
        <CardContent sx={{ color: '#333' }}>
          <Box mt={1} mb={2}>
            {props.name ? (
              <Typography
                align="center"
                variant="subtitle2"
                sx={{ color: '#333' }}
              >
                {props.name}
              </Typography>
            ) : null}
          </Box>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <CustomTextInput
                  caption={props.caption1}
                  placeholder={props.placeholder1}
                  onChange={props.onChange1}
                  disable={edit === 0 ? true : false}
                />
              </Grid>
              <Grid item xs={4}>
                <Box mt={3}>
                  {edit === 0 ? (
                    <Button
                      variant="outlined"
                      onClick={() => setEdit(1)}
                      sx={{
                        boxShadow: 'None',
                        border: '1px solid #C7C7C7',
                        borderRadius: '8px',
                        paddingTop: '12px',
                        paddingBottom: '8px',
                        paddingLeft: '15px',
                        width: '100%',
                        bgcolor: '#FFF!important',
                      }}
                    >
                      <EditIcon
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
                        編集
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => setEdit(0)}
                      sx={{
                        boxShadow: 'None',
                        outlineColor: 'background.default',
                        border: '1px solid #C7C7C7',
                        borderRadius: '8px',
                        paddingTop: '12px',
                        paddingBottom: '8px',
                        paddingLeft: '15px',
                        width: '100%',
                        bgcolor: '#FB9156!important',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ color: 'white' }}>
                        保存
                      </Typography>
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <CustomAutoComplete
                  caption={props.caption2}
                  placeholder={props.placeholder2}
                  selectList={props.listitem}
                  onChange={props.onChange2}
                  disable={edit2 === 0 ? true : false}
                />
              </Grid>
              <Grid item xs={4}>
                <Box mt={3}>
                  {edit2 === 0 ? (
                    <Button
                      variant="outlined"
                      onClick={() => setEdit2(1)}
                      sx={{
                        boxShadow: 'None',
                        border: '1px solid #C7C7C7',
                        borderRadius: '8px',
                        paddingTop: '12px',
                        paddingBottom: '8px',
                        paddingLeft: '15px',
                        width: '100%',
                        bgcolor: '#FFF!important',
                      }}
                    >
                      <EditIcon
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
                        編集
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => setEdit2(0)}
                      sx={{
                        boxShadow: 'None',
                        outlineColor: 'background.default',
                        border: '1px solid #C7C7C7',
                        borderRadius: '8px',
                        paddingTop: '12px',
                        paddingBottom: '8px',
                        paddingLeft: '15px',
                        width: '100%',
                        bgcolor: '#FB9156!important',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ color: 'white' }}>
                        保存
                      </Typography>
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}
