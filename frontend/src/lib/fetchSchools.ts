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
import { CommonFirestore } from '@common'

export const fetchSchools = async () => {
  const q = query(
    collection(db, 'schools').withConverter(
      Firestore.converter(CommonFirestore.School)
    )
  )

  const doc = await getDocs(q)

  return doc.docs.map((doc) => doc.data())
}
