import React from 'react'
import DangerousInformationInMap from '../component/dangerousInformationinMap'

export default function MapPage(props: any) {
  const [show, setShow] = React.useState(1)
  return (
    <div>
      <DangerousInformationInMap
        show={show}
        show_func={setShow}
        time="9月12日15時ごろ"
        content="渡辺が女性を追いかけた"
        area="沖縄県那覇市"
        resource="日本不審者団体"
      />
    </div>
  )
}
