import React from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import '../../firebase/init'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomTextInput from '../component/customTextInput'
import CustomAutoComplete from '../component/customAutoComplete'
import { prefectures } from '~/lib/const'

export default function RegistrationProfile(props: any) {
  return (
    <div>
      <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
        プロフィールの登録
      </Typography>
      <Box mt={4} mb={3}>
        <CustomTextInput
          caption="あなたのお名前"
          value={props.name}
          placeholder="見守り太郎"
          onChange={(e: any) => props.setName(e.target.value)}
        ></CustomTextInput>
      </Box>
      <Box my={3}>
        <CustomAutoComplete
          caption="居住地域"
          value={props.area}
          onChange={(e: any) => props.setArea(e.target.value)}
          placeholder="東京都"
          selectList={prefectures}
        />
      </Box>
    </div>
  )
}
