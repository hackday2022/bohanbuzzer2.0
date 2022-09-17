import React from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import '../../firebase/init'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CustomTextInput from '../component/customTextInput'
import CustomAutoComplete from '../component/customAutoComplete'
import InputSirialNumber from '../component/inputSirialNumber'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export default function RegistrationDevice(props: any) {
  return (
    <div>
      <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
        {props.title}
      </Typography>
      <Box mt={4} mb={3}>
        <CustomTextInput
          caption="デバイスの持ち主のお名前"
          value={props.deviceName}
          onChange={(e: any) => props.setDeviceName(e.target.value)}
          placeholder="見守り太郎"
        ></CustomTextInput>
      </Box>
      <Box my={3}>
        <InputSirialNumber
          caption="シリアル番号"
          placeholder="手動で入力"
          value={props.deviceSirial}
          setDeviceSirial={props.setDeviceSirial}
        />
      </Box>
      <Box mt={3} mb={1}>
        <CustomAutoComplete
          caption="持ち主の所属学校"
          value={props.deviceSchool}
          onChange={(e: any) => props.setDeviceSchool(e.target.value)}
          placeholder="見守り幼稚園"
          selectList={['見守り大学', '見守り大学院', '見守り研究室']}
        />
      </Box>
      {props.add === 1 ? (
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
      ) : null}
    </div>
  )
}
