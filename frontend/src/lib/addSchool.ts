import { CommonFirestore } from '@common'
import { addDoc, collection, getDoc, doc } from 'firebase/firestore'
import { db } from '~/firebase/init'
import { Firestore } from '~/types'

export const addSchool = async (parent: { name: string }) => {
  const schoolDoc = await addDoc(
    collection(db, 'schools').withConverter(
      Firestore.converter(CommonFirestore.School)
    ),
    {
      name: parent.name,
      warnings: [],
    }
  )

  return schoolDoc.id
}
