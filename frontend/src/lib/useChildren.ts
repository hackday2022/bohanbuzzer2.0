import {
  query,
  collection,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  getDoc,
  getDocs,
} from 'firebase/firestore'
import { db } from '~/firebase/init'
import { Firestore } from '~/types'
import * as t from 'io-ts'
import { useUser } from './useUser'
import { useEffect, useState } from 'react'

type ChildLocationLogs = Map<
  string,
  {
    name: string
    icon: string
    locationLog: {
      id: string
      latitude: number
      longitude: number
      time: Date
    }[]
  }
>

const ICON_URL =
  'https://precious.ismcdn.jp/mwimgs/c/3/1080/img_c329b2977f0c543bb74a7e1b39dbfa47698703.jpg'

export const useChildren = () => {
  const { user } = useUser()
  const [children, setChildren] = useState<ChildLocationLogs>(new Map())

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const q = query(
        collection(db, `parents/${user.uid}/children`).withConverter(
          Firestore.converter(Firestore.Child)
        )
      )

      const querySnapshot = await getDocs(q)

      const _children: (t.TypeOf<typeof Firestore.Child> & { id: string })[] =
        []

      querySnapshot.forEach((doc) => {
        _children.push({
          ...doc.data(),
          id: doc.id,
        })
      })

      const unsubscribes = await Promise.all(
        _children.map(async (child) => {
          const deviceRef = child.deviceRef
          if (!deviceRef) return undefined

          const unsubscribe = onSnapshot(
            deviceRef.withConverter(Firestore.converter(Firestore.Device)),
            (doc) => {
              console.log(doc)
              const locations = doc.data()?.gpsLogs

              if (!locations) return

              const newChildLocations = locations.map((location) => ({
                ...location,
                time: location.time.toDate(),
                name: child.name,
              }))

              setChildren(
                children.set(child.id, {
                  name: child.name,
                  icon: ICON_URL,
                  locationLog: newChildLocations,
                })
              )
            }
          )

          return unsubscribe
        })
      )

      return () => {
        unsubscribes.forEach((u) => u?.())
      }
    })()
  })

  return { children }
}
