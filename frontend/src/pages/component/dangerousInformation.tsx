import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import ErrorIcon from '@mui/icons-material/Error'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import { formatDistanceToNow, formatDate } from '~/lib/dateUtil'

export type DangerousInformationProps = {
  date: Date
  area: string
  content: string
  time: string
  resource: string
  hideDate?: boolean
  icon?: React.ReactElement
}

export default function DangerousInformation(props: DangerousInformationProps) {
  return (
    <div>
      {!props.hideDate && (
        <Box mb={1} ml={3}>
          <Typography align="left" variant="h2">
            {formatDate(props.date)}
          </Typography>
        </Box>
      )}
      <Card
        sx={{
          width: '100%',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
          borderRadius: '24px',
          zIndex: 1,
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
            <ErrorIcon sx={{ color: '#FF6464', fontSize: '27px' }} />
            <Typography
              variant="subtitle2"
              sx={{
                ml: 1,
                display: 'inline',
                verticalAlign: '8px',
                color: '#333333',
              }}
            >
              {props.area}
            </Typography>
            <Box sx={{ marginLeft: 'auto' }}>
              {props.icon ?? (
                <MapOutlinedIcon
                  sx={{
                    color: '#333333',
                    fontSize: '27px',
                    float: 'right',
                  }}
                />
              )}
            </Box>
          </Box>
          <Box ml={1}>
            <Typography
              variant="subtitle1"
              sx={{
                mt: '5px',
                verticalAlign: '8px',
                color: 'text.secondary',
              }}
            >
              {props.content}
            </Typography>
            <Box mt={2}>
              <AccessTimeRoundedIcon
                sx={{ color: 'text.secondary', fontSize: '16px' }}
              />
              <Typography
                variant="caption"
                sx={{
                  ml: 1,
                  verticalAlign: '3px',
                  color: 'text.secondary',
                }}
              >
                {formatDistanceToNow(props.date)}
              </Typography>
              <Box mt={0}>
                <LanguageRoundedIcon
                  sx={{ color: 'text.secondary', fontSize: '16px' }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    ml: 1,
                    verticalAlign: '3px',
                    color: 'text.secondary',
                  }}
                >
                  データ提供元： {props.resource}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}
