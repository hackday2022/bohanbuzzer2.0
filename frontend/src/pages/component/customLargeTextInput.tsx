import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function CustomLargeTextInput(props: any) {
  return (
    <div>
      <Box mb={1}>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          {props.caption}
        </Typography>
      </Box>
      <textarea
        className="cumtom-textarea"
        name="name"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  )
}
