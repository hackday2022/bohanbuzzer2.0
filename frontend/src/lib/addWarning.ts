import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { Firestore } from '~/types'
import { db } from '~/firebase/init'

export const addWarning = async (
  title: string,
  location: string | { latitude: number; longitude: number },
  body: string,
  until: Date,
  userId: string,
  contributorType: 'parent' | 'school'
) => {
  let latitude = 0
  let longitute = 0

  if (typeof location === 'string') {
    // TODO: location（住所）から緯度経度に変換する
    latitude = 139.7588499
    longitute = 35.6769883
  } else {
    latitude = location.latitude
    longitute = location.longitude
  }

  const collectionPath =
    contributorType === 'parent'
      ? `parents/${userId}/warnings`
      : `schools/${userId}/warnings`

  await addDoc(
    collection(db, collectionPath).withConverter(
      Firestore.converter(Firestore.Warning)
    ),
    {
      title,
      latitude,
      longitute,
      body,
      since: Timestamp.now(),
      until: Timestamp.fromDate(until),
      source: contributorType === 'parent' ? '親' : '学校',
    }
  )
}
