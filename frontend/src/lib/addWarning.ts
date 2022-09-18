import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { Firestore } from '~/types'
import { db } from '~/firebase/init'
import axios from 'axios'

export const addWarning = async (
  title: string,
  location: string | { latitude: number; longitude: number },
  body: string,
  until: Date,
  userId: string,
  contributorType: 'parent' | 'school'
) => {
  let latitude = 0
  let longitude = 0

  if (typeof location === 'string') {
    const res = await axios.post('/api/address_to_latlng', {
      address: location,
    })
    latitude = res.data.lat
    longitude = res.data.lng
  } else {
    latitude = location.latitude
    longitude = location.longitude
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
      longitude,
      body,
      since: Timestamp.now(),
      until: Timestamp.fromDate(until),
      source: contributorType === 'parent' ? '親' : '学校',
    }
  )
}
