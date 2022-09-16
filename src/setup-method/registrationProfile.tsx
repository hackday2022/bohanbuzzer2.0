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
import CustomTextInput from '../pages/component/customTextInput'
import CompleteButton from '../pages/component/completeButton'
import CustomAutoComplete from '../pages/component/customAutoComplete'

export default function RegistrationProfile(props: any) {
  return (
    <div>
      <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
        プロフィールの登録
      </Typography>
      <Box mt={4} mb={3}>
        <CustomTextInput
          caption="あなたのお名前"
          value=""
          placeholder="見守り太郎"
        ></CustomTextInput>
      </Box>
      <Box my={3}>
        <CustomAutoComplete
          caption="居住地域"
          value=""
          placeholder="見守り太郎"
          selectList={['見守り太郎', '見守り花子', '見守り桜子']}
        />
      </Box>
    </div>
  )
}
