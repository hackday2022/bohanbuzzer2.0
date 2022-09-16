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
import CustomTextInput from '../pages/lib/customTextInput'
import CompleteButton from '../pages/lib/completeButton'
import CustomAutoComplete from '../pages/lib/customAutoComplete'
import InputSirialNumber from '../pages/lib/inputSirialNumber'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export default function RegistrationDevice(props: any) {
  return (
    <div>
      <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
        デバイスの設定
      </Typography>
      <Box mt={4} mb={3}>
        <CustomTextInput
          caption="デバイスの持ち主のお名前"
          value=""
          placeholder="Jackson"
        ></CustomTextInput>
      </Box>
      <Box my={3}>
        <InputSirialNumber caption="シリアル番号" placeholder="手動で入力" />
      </Box>
      <Box mt={3} mb={1}>
        <CustomAutoComplete
          caption="持ち主の所属学校"
          value=""
          placeholder="見守り幼稚園"
          selectList={['見守り大学', '見守り大学院', '見守り研究室']}
        />
      </Box>
      <Box mb={2}>
        <Button
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <AddCircleOutlineIcon
            sx={{ color: 'text.secondary', marginBottom: '2px' }}
          />
          <Typography
            align="center"
            variant="subtitle1"
            sx={{ marginLeft: '10px', color: 'text.secondary' }}
          >
            デバイスを追加登録する
          </Typography>
        </Button>
      </Box>
    </div>
  )
}
