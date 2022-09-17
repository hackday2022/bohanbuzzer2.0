import React, { useState } from 'react'
import SegmentedButton from '../pages/component/segmentControlButton'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import FaceIcon from '@mui/icons-material/Face'
import NotificationPage from '../pages/map-steper/notificationPage'
// ☟サンプルになっているので注意
import MapPage from '../pages/map-steper/mapPage'
import FacePage from '../pages/map-steper/facePage'
import { useJsApiLoader } from '@react-google-maps/api'
import { useRouter } from 'next/router'

export default function Map() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  })

  return (
    <div className="h-[100dvh] overscroll-y-none">
      {page === 1 ? (
        <MapPage isLoaded={isLoaded} />
      ) : page === 2 ? (
        <NotificationPage router={router} />
      ) : (
        <FacePage />
      )}
      <SegmentedButton
        onChange={setPage}
        className="segmented-button-custom"
        list={[
          {
            label: (
              <MapOutlinedIcon
                sx={{
                  fontSize: 30,
                  color: '#000000',
                  width: '36px',
                  height: '36px',
                  transition: 'color .1s',
                }}
                key="1"
              />
            ),
            value: 1,
          },
          {
            label: (
              <NotificationsNoneIcon
                sx={{
                  fontSize: 30,
                  color: '#000000',
                  width: '36px',
                  height: '36px',
                  transition: 'color .1s',
                }}
                key="2"
              />
            ),
            value: 2,
          },
          {
            label: (
              <FaceIcon
                sx={{
                  fontSize: 30,
                  color: '#000000',
                  width: '36px',
                  height: '36px',
                  transition: 'color .1s',
                }}
                key="3"
              />
            ),
            value: 3,
          },
        ]}
      />
    </div>
  )
}
