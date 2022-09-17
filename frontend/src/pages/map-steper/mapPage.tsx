import React, { useEffect, useState } from 'react'
import SpotIcon from '../../component/SpotIcon'
import { GoogleMap, InfoBox } from '@react-google-maps/api'
import UserSelectButton from '../../component/UserSelectButton'
import DangerousInformation from '../component/dangerousInformation'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Drawer, IconButton } from '@mui/material'
import SegmentedButton from '../../pages/component/segmentControlButton'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import FaceIcon from '@mui/icons-material/Face'

export type MapPageProps = {
  isLoaded: boolean
}

const defaultCenter = {
  lat: 35.6896,
  lng: 139.7006,
}

const USERS = [
  {
    id: '0',
    name: '彩香',
    iconUrl:
      'https://precious.ismcdn.jp/mwimgs/c/3/1080/img_c329b2977f0c543bb74a7e1b39dbfa47698703.jpg',
    pos: {
      lat: 35.6896,
      lng: 139.7006,
    },
  },
  {
    id: '1',
    name: '太郎',
    iconUrl:
      'https://precious.ismcdn.jp/mwimgs/c/3/1080/img_c329b2977f0c543bb74a7e1b39dbfa47698703.jpg',
    pos: {
      lat: 35.6886,
      lng: 139.7016,
    },
  },
  {
    id: '2',
    name: '次郎',
    iconUrl:
      'https://precious.ismcdn.jp/mwimgs/c/3/1080/img_c329b2977f0c543bb74a7e1b39dbfa47698703.jpg',
    pos: {
      lat: 35.6893,
      lng: 139.7026,
    },
  },
  {
    id: '3',
    name: '次郎',
    iconUrl:
      'https://precious.ismcdn.jp/mwimgs/c/3/1080/img_c329b2977f0c543bb74a7e1b39dbfa47698703.jpg',
    pos: {
      lat: 35.6896,
      lng: 139.7036,
    },
  },
  {
    id: '4',
    name: '次郎',
    iconUrl:
      'https://precious.ismcdn.jp/mwimgs/c/3/1080/img_c329b2977f0c543bb74a7e1b39dbfa47698703.jpg',
    pos: {
      lat: 35.6916,
      lng: 139.7046,
    },
  },
]

const WARNS = [
  {
    id: '1',
    title: '下校途中の女児を追いかけた。',
    address: '八代市古城町付近',
    time: '15時過ぎ',
    source: '日本不審者情報センター（Twitter）',
    pos: {
      lat: 35.6916,
      lng: 139.704,
    },
  },
]

export default function MapPage({ isLoaded }: MapPageProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const [focusItem, setFocusItem] = useState<{
    id: string
    type: 'user' | 'warn'
  } | null>({ type: 'user', id: USERS[0].id })
  const [isFirstUpdate, setIsFirstUpdate] = useState(false)

  const onUnmount = () => setMap(null)

  useEffect(() => {
    if (!isLoaded || map == null || focusItem == null) {
      return
    }

    const array =
      focusItem.type === 'user'
        ? (USERS as {
            id: string
            pos: google.maps.LatLngLiteral
          }[])
        : (WARNS as {
            id: string
            pos: google.maps.LatLngLiteral
          }[])

    const targetPos = array.find(({ id }) => id === focusItem.id)?.pos
    if (targetPos == null) {
      return
    }

    if (isFirstUpdate) {
      setIsFirstUpdate(true)
      return
    }
    map.setZoom(18)
    map.panTo(targetPos)
  }, [focusItem, isLoaded, map, isFirstUpdate])

  return (
    <>
      <div className="w-screen h-[100dvh] fixed inset-0 overflow-hidden overscroll-y-none">
        {isLoaded ? (
          <>
            <GoogleMap
              center={defaultCenter}
              zoom={18}
              options={{
                disableDefaultUI: true,
              }}
              clickableIcons={false}
              onLoad={async (map) => {
                // console.log(window.innerWidth, window.innerHeight)
                // const wlh = window.innerWidth / window.innerHeight
                const bounds = new window.google.maps.LatLngBounds(
                  {
                    lat: defaultCenter.lat - 0.004,
                    lng: defaultCenter.lng - 0.004,
                  },
                  {
                    lat: defaultCenter.lat + 0.004,
                    lng: defaultCenter.lng + 0.004,
                  }
                )
                // USERS.forEach((user) => {
                //   bounds.extend(user.pos)
                // })
                map.fitBounds(bounds)
                await new Promise((resolve) => setTimeout(resolve, 300))
                setMap(map)
              }}
              onUnmount={onUnmount}
              mapContainerClassName="w-full h-full focus:outline-none"
            >
              {map != null &&
                USERS.map((user) => (
                  <SpotIcon
                    key={user.id}
                    latLng={user.pos}
                    isFocused={
                      focusItem?.type === 'user' && user.id === focusItem.id
                    }
                    onClick={() => {
                      setFocusItem({ type: 'user', id: user.id })
                    }}
                    iconUrl={user.iconUrl}
                  />
                ))}
              {map != null &&
                WARNS.map((warn) => (
                  <SpotIcon
                    key={warn.id}
                    latLng={warn.pos}
                    isFocused={
                      focusItem?.type === 'warn' && warn.id === focusItem.id
                    }
                    // onFocus={(value) => {
                    //   if (value) {
                    //     setFocusItem({ type: 'warn', id: warn.id })
                    //   } else if (
                    //     focusItem?.type === 'warn' &&
                    //     focusItem.id === warn.id
                    //   ) {
                    //     setFocusItem(null)
                    //   }
                    // }}
                    onClick={() => setFocusItem({ type: 'warn', id: warn.id })}
                    warn
                  />
                ))}
            </GoogleMap>
            <div className="absolute inset-x-0 bottom-[72px] flex justify-end">
              <div className="flex space-x-4 overflow-x-scroll py-4 px-8 scrollbar-hidden">
                {USERS.map((user) => (
                  <UserSelectButton
                    key={user.id}
                    user={user}
                    isSelected={
                      focusItem?.type === 'user' && focusItem.id === user.id
                    }
                    onSelect={() => {
                      setFocusItem({ type: 'user', id: user.id })
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Drawer
        anchor="bottom"
        open={focusItem?.type === 'warn'}
        onClose={() => setFocusItem(null)}
        sx={{
          pointerEvents: 'none',
          '& > .MuiBackdrop-root': {
            background: 'transparent',
          },
        }}
      >
        <Box sx={{ pointerEvents: 'auto' }}>
          <DangerousInformation
            date="2月14日"
            area="国会議事堂"
            content="痴漢事案およびストーカー事案。近くのPD至急対応に当たれ。"
            resource="警視庁"
            time="3時ごろ"
            hideDate
            icon={
              <IconButton onClick={() => setFocusItem(null)}>
                <CloseRoundedIcon sx={{ color: 'black' }} />
              </IconButton>
            }
          />
        </Box>
      </Drawer>
    </>
  )
}
