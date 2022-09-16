import React, { useEffect } from 'react'
import { Segmented } from 'antd'
import 'antd/dist/antd.css'

export default function SegmentedButton(props: any) {
  return (
    <div className={props.className}>
      <Segmented className="segment_block" options={props.list} />
    </div>
  )
}
