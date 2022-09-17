import { Unsubscribe } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export const useOnSnapshot = <Param, UpdateItem>(
  fetchWarnings: (
    param: Param,
    onUpdate: (updates: UpdateItem[]) => void
  ) => Unsubscribe,
  param: Param
) => {
  const [items, setItems] = useState<UpdateItem[]>([])

  useEffect(() => {
    const unsubscribe = fetchWarnings(param, (updates) => {
      setItems(updates)
    })
    return () => unsubscribe()
  }, [])

  return items
}
