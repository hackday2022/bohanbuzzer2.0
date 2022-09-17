import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { Firestore } from '~/types'
import { db } from '~/firebase/init'

type Warning = {
  title: string
  latitude: number
  longitute: number
  body: string
  since: Date
  until: Date
}

export const fetchWarnings = async (userId: string, schoolId: string) => {
  const collectionPaths = [
    `parents/${userId}/warnings`,
    `schools/${schoolId}/warnings`,
    `public/warnings`,
  ]

  const warnings = await Promise.all(
    await collectionPaths.reduce<Promise<Warning[]>>(
      async (acc, collectionPath) => {
        const q = query(
          collection(db, collectionPath).withConverter(
            Firestore.converter(Firestore.Warning)
          ),
          orderBy('until', 'desc'),
          where('until', '>', Timestamp.now())
        )

        const querySnapshot = await getDocs(q)

        const newWarning = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          since: doc.data().since.toDate(),
          until: doc.data().until.toDate(),
        }))

        return [...(await acc), ...newWarning]
      },
      Promise.resolve([])
    )
  )

  return warnings
}
