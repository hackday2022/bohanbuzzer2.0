import { CircleF, InfoBox } from '@react-google-maps/api'
import React, { useMemo } from 'react'
import classNames from 'classnames'

const circleOption: google.maps.CircleOptions = {
  fillColor: '#FB9156',
  fillOpacity: 0.4,
  strokeColor: '#FB9156',
  strokeOpacity: 0.4,
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
  onFocus: (value: boolean) => void
} & {
  iconUrl: string
}

const SpotIcon: React.FC<SpotIconProps> = ({
  latLng: latLngLiteral,
  isFocused,
  onFocus,
  iconUrl,
}) => {
  const latLng = useMemo(
    () => new google.maps.LatLng(latLngLiteral),
    [latLngLiteral]
  )
  return (
    <>
      <CircleF center={latLng} options={circleOption} />
      <InfoBox position={latLng}>
        <div className="p-4 w-max -translate-x-1/2 -translate-y-1/2">
          <button
            className={classNames(
              'bg-transparent p-0 group border-transparent cursor-pointer rounded-full w-max hover:scale-110 transition focus:outline-none'
            )}
            onClick={(e) => {
              e.stopPropagation()
              console.log('click')
            }}
            onFocus={() => onFocus(true)}
            onBlur={() => onFocus(false)}
          >
            <img
              width="48px"
              height="48px"
              className={classNames(
                'object-cover rounded-full border-[3px] border-solid border-white drop-shadow-icon group-focus:ring ring-primary',
                isFocused && 'ring'
              )}
              src={iconUrl}
            />
          </button>
        </div>
      </InfoBox>
    </>
  )
}

export default SpotIcon
