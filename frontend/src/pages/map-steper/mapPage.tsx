import React, { useEffect, useMemo, useState } from 'react'
import SpotIcon from '../../component/SpotIcon'
import { GoogleMap } from '@react-google-maps/api'
import UserSelectButton from '../../component/UserSelectButton'
import DangerousInformation from '../component/dangerousInformation'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, IconButton, Drawer } from '@mui/material'
import { fetchTweetWarnings, TweetWarning, Warning } from '~/lib/fetchWaning'
import { useOnSnapshot } from '~/lib/useOnSnapshot'

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

export default function MapPage({ isLoaded }: MapPageProps) {
  const warnings = useOnSnapshot(fetchTweetWarnings, {})

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const [focusItemId, setFocusItemId] = useState<{
    id: string
    type: 'user' | 'warn'
  } | null>({ type: 'user', id: USERS[0].id })

  const [isFirstUpdate, setIsFirstUpdate] = useState(false)

  const focusItem = useMemo(() => {
    if (focusItemId == null) {
      return null
    }
    const array =
      focusItemId.type === 'user'
        ? (USERS as {
            id: string
            pos: google.maps.LatLngLiteral
          }[])
        : (warnings.map(({ id, longitude, latitude }) => ({
            id,
            pos: { lng: longitude, lat: latitude },
          })) as {
            id: string
            pos: google.maps.LatLngLiteral
          }[])

    return array.find(({ id }) => id === focusItemId.id) ?? null
  }, [focusItemId, warnings])

  const tweetWarningFocusItem = useMemo(() => {
    if (focusItemId == null) {
      return null
    }
    return warnings.find(({ id }) => id === focusItemId.id) ?? null
  }, [warnings, focusItemId])

  useEffect(() => {
    if (!isLoaded || map == null || focusItem == null) {
      return
    }

    if (isFirstUpdate) {
      setIsFirstUpdate(true)
      return
    }
    // map.setZoom(18)
    map.panTo(focusItem.pos)
  }, [focusItemId, isLoaded, map, isFirstUpdate])

  const onUnmount = () => setMap(null)

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
                      focusItemId?.type === 'user' && user.id === focusItemId.id
                    }
                    onClick={() => {
                      setFocusItemId({ type: 'user', id: user.id })
                    }}
                    iconUrl={user.iconUrl}
                  />
                ))}
              {map != null &&
                warnings
                  .filter((warn) => 'tweet_time' in warn)
                  .map((warn) => (
                    <SpotIcon
                      key={warn.id}
                      latLng={{ lat: warn.latitude, lng: warn.longitude }}
                      isFocused={
                        focusItemId?.type === 'warn' &&
                        warn.id === focusItemId.id
                      }
                      onClick={() =>
                        setFocusItemId({ type: 'warn', id: warn.id })
                      }
                      warn
                    />
                  ))}
            </GoogleMap>
            <div className="absolute inset-x-0 bottom-[86px] flex justify-end">
              <div className="flex px-8 py-4 space-x-4 overflow-x-scroll scrollbar-hidden">
                {USERS.map((user) => (
                  <UserSelectButton
                    key={user.id}
                    user={user}
                    isSelected={
                      focusItemId?.type === 'user' && focusItemId.id === user.id
                    }
                    onSelect={() => {
                      setFocusItemId({ type: 'user', id: user.id })
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
        open={tweetWarningFocusItem != null}
        onClose={() => setFocusItemId(null)}
        sx={{
          pointerEvents: 'none',
          transitionDelay: 0,
          '& > .MuiBackdrop-root': {
            background: 'transparent',
          },
        }}
        transitionDuration={{ appear: 200, enter: 200, exit: 200 }}
      >
        <Box sx={{ pointerEvents: 'auto' }}>
          {tweetWarningFocusItem != null && (
            <DangerousInformation
              date={tweetWarningFocusItem.tweet_time}
              area={[tweetWarningFocusItem.title].flat(2).join(',')}
              content={tweetWarningFocusItem.body}
              resource={tweetWarningFocusItem.source}
              time={tweetWarningFocusItem.tweet_time.toString()}
              hideDate
              icon={
                <IconButton onClick={() => setFocusItemId(null)}>
                  <CloseRoundedIcon sx={{ color: 'black' }} />
                </IconButton>
              }
            />
          )}
        </Box>
      </Drawer>
    </>
  )
}
