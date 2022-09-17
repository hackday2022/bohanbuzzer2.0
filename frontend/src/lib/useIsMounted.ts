import { useEffect, useState } from 'react'

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])
  return isMounted
}
