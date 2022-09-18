import React from 'react'
import DangerousInformationInMap from '../component/dangerousInformationinMap'

export default function MapPage(props: any) {
  return (
    <div>
      <DangerousInformationInMap
        time="アラートを受信しました"
        adress=" 兵庫県神戸市付近"
        latlng="35.000000N, 135.000000F"
        alerttime="14時37分ごろ(15分前)"
      />
    </div>
  )
}
