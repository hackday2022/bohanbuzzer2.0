import { Unsubscribe } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export const useOnSnapshot = <Param, UpdateItem extends { id: string }>(
  fetchWarnings: (
    param: Param,
    onUpdate: (updates: UpdateItem[]) => void
  ) => Unsubscribe,
  param: Param
) => {
  const [items, setItems] = useState<UpdateItem[]>([])

  useEffect(() => {
    const unsubscribe = fetchWarnings(param, (updates) => {
      setItems((prev) => {
        const prevIds = prev.map(({ id }) => id)

        return [...prev, ...updates.filter(({ id }) => !prevIds.includes(id))]
      })
    })
    return () => unsubscribe()
  }, [])

  return items
}
