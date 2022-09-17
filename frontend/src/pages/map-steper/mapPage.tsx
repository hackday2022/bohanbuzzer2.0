import React, { useEffect, useState } from 'react'
import SpotIcon from '../../component/SpotIcon'
import { GoogleMap } from '@react-google-maps/api'
import UserSelectButton from '../../component/UserSelectButton'

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
] as const

export default function MapPage({ isLoaded }: MapPageProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const [focusItemId, setFocusItemId] = useState<string | null>(USERS[0].id)
  const [isFirstUpdate, setIsFirstUpdate] = useState(false)

  const onUnmount = () => setMap(null)

  useEffect(() => {
    if (!isLoaded || map == null || focusItemId == null) {
      return
    }
    const user = USERS.find(({ id }) => id === focusItemId)
    if (user == null) {
      return
    }

    if (isFirstUpdate) {
      setIsFirstUpdate(true)
      return
    }
    map.setZoom(18)
    map.panTo(user.pos)
  }, [focusItemId, isLoaded, map, isFirstUpdate])

  console.log(focusItemId)

  return (
    <div className="w-screen h-screen relative">
      {isLoaded ? (
        <>
          <GoogleMap
            center={defaultCenter}
            zoom={18}
            options={{
              disableDefaultUI: true,
            }}
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
                  isFocused={user.id === focusItemId}
                  onFocus={(value) => {
                    if (value) {
                      setFocusItemId(user.id)
                    } else if (focusItemId === user.id) {
                      setFocusItemId(null)
                    }
                  }}
                  iconUrl={user.iconUrl}
                />
              ))}
          </GoogleMap>
          <div className="absolute inset-x-0 bottom-[80px] flex space-x-4 overflow-x-scroll py-4 px-8 justify-end">
            {USERS.map((user) => (
              <UserSelectButton
                key={user.id}
                user={user}
                isSelected={focusItemId === user.id}
                onSelect={() => setFocusItemId(user.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
