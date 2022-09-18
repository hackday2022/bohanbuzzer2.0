import React, { useEffect, useMemo, useState } from 'react'
import SpotIcon from '../../component/SpotIcon'
import { GoogleMap } from '@react-google-maps/api'
import UserSelectButton from '../../component/UserSelectButton'
import DangerousInformation from '../component/dangerousInformation'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, IconButton, Drawer } from '@mui/material'
import { Warning } from '~/lib/fetchWaning'
import { LocationLogItem } from '~/lib/useChildren'

export type MapPageProps = {
  isLoaded: boolean
  allWarnings: Warning[]
  childrens: {
    name: string
    icon: string
    location: LocationLogItem | null
    locationLog: LocationLogItem[]
    id: string
  }[]
}

const defaultCenter = {
  lat: 35.6896,
  lng: 139.7006,
}

export default function MapPage({
  isLoaded,
  allWarnings,
  childrens: children,
}: MapPageProps) {
  const warnings = allWarnings?.filter((warning) => !('city' in warning))

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const [focusItemId, setFocusItemId] = useState<{
    id: string
    type: 'user' | 'warn'
  } | null>(null)

  const [isFirstUpdate, setIsFirstUpdate] = useState(false)

  const focusItem = useMemo(() => {
    if (focusItemId == null) {
      return null
    }
    const array =
      focusItemId.type === 'user'
        ? children.map((child) => ({
            id: child.id,
            longitude: child.location?.longitude,
            latitude: child.location?.latitude,
          }))
        : warnings

    return array?.find(({ id }) => id === focusItemId.id) ?? null
  }, [focusItemId, warnings])

  const warningFocusItem = useMemo(() => {
    if (focusItemId == null) {
      return null
    }
    return warnings?.find(({ id }) => id === focusItemId.id) ?? null
  }, [warnings, focusItemId])

  useEffect(() => {
    if (!isLoaded || map == null || focusItem == null) {
      return
    }

    if (isFirstUpdate) {
      setIsFirstUpdate(true)
      return
    }
    if (focusItem.longitude == null || focusItem.latitude == null) {
      return
    }
    map.panTo({ lng: focusItem.longitude, lat: focusItem.latitude })
  }, [focusItemId, isLoaded, map, isFirstUpdate])

  const onUnmount = () => setMap(null)

  const selectedChild = children?.find(
    (child) =>
      focusItemId != null &&
      focusItemId.type === 'user' &&
      child.id === focusItemId?.id
  )

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
                children.map((child) =>
                  child.location != null ? (
                    <SpotIcon
                      key={child.id}
                      latLng={{
                        lat: child.location.latitude,
                        lng: child.location.longitude,
                      }}
                      isFocused={
                        focusItemId?.type === 'user' &&
                        child.id === focusItemId.id
                      }
                      onClick={() => {
                        setFocusItemId({ type: 'user', id: child.id })
                      }}
                      iconUrl={child.icon}
                    />
                  ) : null
                )}
              {selectedChild != null &&
                selectedChild.locationLog
                  .filter(({ isAlerted }) => isAlerted)
                  .map((log) => (
                    <SpotIcon
                      key={log.id}
                      latLng={{ lat: log.latitude, lng: log.longitude }}
                      isFocused={false}
                      onClick={() => {
                        // TODO: do nothing
                      }}
                      alert
                    />
                  ))}
              {map != null &&
                warnings.map((warn) => (
                  <SpotIcon
                    key={warn.id}
                    latLng={{ lat: warn.latitude, lng: warn.longitude }}
                    isFocused={
                      focusItemId?.type === 'warn' && warn.id === focusItemId.id
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
                {children.map((child) => (
                  <UserSelectButton
                    key={child.id}
                    user={{ name: child.name, iconUrl: child.icon }}
                    isSelected={
                      focusItemId?.type === 'user' &&
                      focusItemId.id === child.id
                    }
                    onSelect={() => {
                      setFocusItemId({ type: 'user', id: child.id })
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
        open={warningFocusItem != null}
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
          {warningFocusItem != null && (
            <DangerousInformation
              date={
                'tweet_time' in warningFocusItem
                  ? warningFocusItem.tweet_time
                  : warningFocusItem.since
              }
              area={[warningFocusItem.title].flat(2).join(',')}
              content={warningFocusItem.body}
              resource={warningFocusItem.source}
              time={
                'tweet_time' in warningFocusItem
                  ? warningFocusItem.tweet_time.toString()
                  : warningFocusItem.since.toString()
              }
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
