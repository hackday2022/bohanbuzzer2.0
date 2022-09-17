import React from 'react'
import classNames from 'classnames'

export type UserSelectButtonProps = {
  isSelected: boolean
  onSelect: () => void
  user: {
    name: string
    iconUrl: string
  }
  className?: string
}

const UserSelectButton: React.FC<UserSelectButtonProps> = ({
  isSelected,
  onSelect,
  user,
  className,
}) => {
  return (
    <button
      className={classNames(
        'shadow-main flex space-x-4 items-center bg-white rounded-3xl px-4 py-3 shrink-0 ring-primary border-none cursor-pointer hover:bg-gray-50 transition',
        isSelected && 'ring bg-[#ffe8dc] hover:bg-[#fee0cf]',
        className
      )}
      onClick={onSelect}
    >
      <img
        src={user.iconUrl}
        width={32}
        height={32}
        className="rounded-full object-cover"
        alt=""
      />
      <div className="font-bold">{user.name}</div>
    </button>
  )
}

export default UserSelectButton
