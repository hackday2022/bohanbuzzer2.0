import React from 'react'
import SegmentedButton from '../pages/component/segmentControlButton'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import FaceIcon from '@mui/icons-material/Face'
import NotificationPage from '../pages/map-steper/notificationPage'
import MapPage from '../pages/map-steper/mapPage'
import FacePage from '../pages/map-steper/facePage'

export default function Map() {
  const [page, setPage] = React.useState(0)
  return (
    <div>
      {page === 0 ? (
        <MapPage />
      ) : page === 1 ? (
        <NotificationPage />
      ) : (
        <FacePage />
      )}
      <SegmentedButton
        onChange={(e: any) => setPage(e.target.value)}
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
