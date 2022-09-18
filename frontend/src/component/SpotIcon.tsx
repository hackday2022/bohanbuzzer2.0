import { CircleF, InfoBox } from '@react-google-maps/api'
import React, { useMemo } from 'react'
import classNames from 'classnames'
import { Campaign, PriorityHighRounded } from '@mui/icons-material'

const circleOption: google.maps.CircleOptions = {
  fillOpacity: 0.4,
  strokeColor: 'transparent',
  strokeOpacity: 0,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30,
  zIndex: 1,
}

export type SpotIconProps = {
  latLng: google.maps.LatLngLiteral
  isFocused: boolean
  onFocus?: (value: boolean) => void
  onClick?: () => void
} & (
  | {
      iconUrl: string
      warn?: undefined
      alert?: undefined
    }
  | {
      iconUrl?: undefined
      warn: true
      alert?: undefined
    }
  | {
      iconUrl?: undefined
      warn?: undefined
      alert: true
    }
)

const SpotIcon: React.FC<SpotIconProps> = ({
  latLng: latLngLiteral,
  isFocused,
  onFocus,
  iconUrl,
  warn,
  onClick,
  alert,
}) => {
  const latLng = useMemo(
    () => new google.maps.LatLng(latLngLiteral),
    [latLngLiteral]
  )
  return (
    <>
      <CircleF
        center={latLng}
        options={{
          ...circleOption,
          fillColor: alert ? '#FF0000' : warn ? '#FF6464' : '#FB9156',
        }}
        onClick={(e) => e.stop()}
      />
      <InfoBox position={latLng}>
        <div className="p-4 -translate-x-1/2 -translate-y-1/2 w-max">
          <button
            className={classNames(
              'bg-transparent p-0 group border-transparent cursor-pointer rounded-full w-max transition focus:outline-none',
              isFocused && 'animate-bounce'
            )}
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
            onFocus={() => onFocus?.(true)}
            onBlur={() => onFocus?.(false)}
          >
            {warn ? (
              <div className="w-[48px] h-[48px] drop-shadow-icon rounded-full border-[3px] border-solid border-white bg-alert text-white flex items-center justify-center">
                <PriorityHighRounded />
              </div>
            ) : alert ? (
              <div className="w-[48px] h-[48px] drop-shadow-icon rounded-full border-[3px] border-solid border-white bg-alert text-white flex items-center justify-center">
                <Campaign />
              </div>
            ) : (
              <img
                width="48px"
                height="48px"
                className={classNames(
                  'object-cover rounded-full border-[3px] border-solid border-white drop-shadow-icon group-focus:ring',
                  warn ? 'ring-alert' : 'ring-primary',
                  isFocused && 'ring'
                )}
                src={iconUrl}
              />
            )}
          </button>
        </div>
      </InfoBox>
    </>
  )
}

export default SpotIcon
