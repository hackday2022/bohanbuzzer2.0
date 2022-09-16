import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, Grid } from '@mui/material'
import QrCodeIcon from '@mui/icons-material/QrCode'

export default function InputSirialNumber(props: any) {
  return (
    <div>
      <Box mb={1}>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          {props.caption}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Button
            variant="outlined"
            onClick={props.onClick}
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
            <QrCodeIcon
              sx={{
                fontSize: 16,
                marginRight: '10px',
                marginBottom: '2px',
                color: '#333333',
              }}
            />
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              QRコードを読み取る
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <input
            type="text"
            className="cumtom-text-input"
            name="name"
            value={props.value}
            placeholder={props.placeholder}
            onChange={(e: any) => props.setDeviceSirial(e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  )
}
