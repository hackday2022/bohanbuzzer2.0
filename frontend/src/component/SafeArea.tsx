import React from 'react'
import classNames from 'classnames'

export type SafeAreaProps = {
  children: React.ReactNode
  top?: boolean
  left?: boolean
  right?: boolean
  bottom?: boolean
  all?: boolean
}

const SafeArea: React.FC<SafeAreaProps> = ({
  children,
  top,
  left,
  right,
  bottom,
  all = false,
}) => {
  const _top = top || all
  const _left = left || all
  const _right = right || all
  const _bottom = bottom || all

  return (
    <div
      className={classNames(
        _top && 'pb-[env(safe-area-inset-top)]',
        _left && 'pb-[env(safe-area-inset-left)]',
        _right && 'pb-[env(safe-area-inset-right)]',
        _bottom && 'pb-[env(safe-area-inset-bottom)]'
      )}
    >
      {children}
    </div>
  )
}

export default SafeArea
