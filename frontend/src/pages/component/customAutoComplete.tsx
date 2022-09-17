import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function CustomAutoComplete(props: any) {
  return (
    <div>
      <Box mb={1}>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          {props.caption}
        </Typography>
      </Box>
      <select
        className="custom-select-button"
        name="select"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      >
        {props.selectList
          ? props.selectList.map((item: string) => {
              return <option key={item}>{item}</option>
            })
          : null}
      </select>
    </div>
  )
}
