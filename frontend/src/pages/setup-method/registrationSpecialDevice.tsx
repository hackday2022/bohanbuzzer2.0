import React from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import '../../firebase/init'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CustomTextInput from '../component/customTextInput'
import CustomAutoComplete from '../component/customAutoComplete'
import InputSirialNumber from '../component/inputSpecialSirialNumber'
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
          value={props.deviceName[props.page]}
          onChange={(e: any) =>
            props.setDeviceName(e.target.value, props.page, props.deviceName)
          }
          placeholder="見守り太郎"
        ></CustomTextInput>
      </Box>
      <Box my={3}>
        <InputSirialNumber
          caption="シリアル番号"
          placeholder="手動で入力"
          value={props.deviceSirial[props.page]}
          setDeviceSirial={(e: any) =>
            props.setDeviceSirial(
              e.target.value,
              props.page,
              props.deviceSirial
            )
          }
        />
      </Box>
      <Box mt={3} mb={1}>
        <CustomAutoComplete
          caption="持ち主の所属学校"
          value={props.deviceSchool[props.page]}
          onChange={(e: any) =>
            props.setDeviceSchool(
              e.target.value,
              props.page,
              props.deviceSchool
            )
          }
          placeholder="見守り幼稚園"
          selectList={props.schoolList}
          disabled={props.fetchingSchools}
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
            onClick={props.addOnClick}
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
