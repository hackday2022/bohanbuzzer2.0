import React from 'react'
import SegmentedButton from '../pages/component/segmentControlButton'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import FaceIcon from '@mui/icons-material/Face'

export default function Map() {
  return (
    <div>
      <SegmentedButton
        value={'1'}
        className="segmented-button-custom"
        list={[
          {
            label: (
              <MapOutlinedIcon
                sx={{
                  fontSize: 30,
                  color: '#000000',
                  marginTop: '8px',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
                key="1"
              />
            ),
            value: 'map',
          },
          {
            label: (
              <NotificationsNoneIcon
                sx={{
                  fontSize: 30,
                  color: '#000000',
                  marginTop: '8px',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
                key="2"
              />
            ),
            value: 'notification',
          },
          {
            label: (
              <FaceIcon
                sx={{
                  fontSize: 30,
                  color: '#000000',
                  marginTop: '8px',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
                key="3"
              />
            ),
            value: 'face',
          },
        ]}
      />
    </div>
  )
}
