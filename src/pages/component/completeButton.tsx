import React from 'react'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'

export default function CompleteButton(props: any) {
  if (props.mode === 'light') {
    return (
      <Button
        variant="contained"
        onClick={props.onClick}
        sx={{
          boxShadow: 'None',
          border: '1px solid #FB9156',
          borderRadius: '8px',
          paddingTop: '12px',
          paddingLeft: '15px',
          width: '100%',
        }}
      >
        <Typography variant="subtitle1" sx={{ color: 'white' }}>
          {props.name}
        </Typography>
      </Button>
    )
  } else {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          boxShadow: 'None',
          border: '1px solid #C7C7C7',
          borderRadius: '8px',
          paddingTop: '12px',
          paddingLeft: '15px',
          width: '100%',
        }}
      >
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          {props.name}
        </Typography>
      </Button>
    )
  }
}
