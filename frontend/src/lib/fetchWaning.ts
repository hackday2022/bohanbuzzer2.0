import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  Unsubscribe,
  where,
} from 'firebase/firestore'
import { Firestore } from '~/types'
import { db } from '~/firebase/init'
import * as t from 'io-ts'

export type Warning = typeof Firestore.Warning extends t.Type<
  infer A extends Record<string, unknown>
>
  ? {
      [Key in keyof A]: A[Key] extends Timestamp ? Date : A[Key]
    } & {
      id: string
    }
  : never

export type TweetWarning = Warning & { tweet_time: Date }
export type WeatherWarning = Warning & { city: string }
export type ParentWarning = Warning & { until: Date }

type FetchWarningsParam = {
  userId: string
  schoolId: string
}

export const fetchWarnings = (
  { userId, schoolId }: FetchWarningsParam,
  onUpdate: (warnings: Warning[]) => void
): Unsubscribe => {
  const collectionPaths = [
    `parents/${userId}/warnings`,
    `schools/${schoolId}/warnings`,
    `public`,
  ]

  // const res = await Promise.all(
  const unsubscribes = collectionPaths.map((collectionPath) => {
    const q = query(
      collection(db, collectionPath).withConverter(
        Firestore.converter(Firestore.Warning)
      ),
      // TODO: temporary comment out
      // orderBy('until', 'desc'),
      // where('until', '>', Timestamp.now())
      limit(30)
    )

    // const querySnapshot = await getDocs(q)

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const warnings: Warning[] = []
      querySnapshot.docChanges().forEach((change) => {
        if (change.type !== 'added') {
          return
        }
        const doc = change.doc
        const data = doc.data()
        if ('tweet_time' in data) {
          warnings.push({
            id: doc.id,
            ...data,
            tweet_time: data.tweet_time.toDate(),
          })
        } else if ('city' in data) {
          warnings.push({
            id: doc.id,
            ...data,
            city: data.city,
            since: data.since.toDate(),
          })
        } else {
          warnings.push({
            id: doc.id,
            ...data,
            since: data.since.toDate(),
            until: data.until.toDate(),
          })
        }
      })
      onUpdate(warnings)
    })

    return unsubscribe
  })

  const unsubscribe = () => {
    unsubscribes.forEach((unsubscribe) => unsubscribe())
  }

  return unsubscribe
}

type FetchMapWarningsParam = {
  userId: string
  schoolId: string
}

export const fetchMapWarnings = (
  { userId, schoolId }: FetchMapWarningsParam,
  onUpdate: (warnings: Warning[]) => void
): Unsubscribe => {
  const collectionPaths = [
    `parents/${userId}/warnings`,
    `schools/${schoolId}/warnings`,
    `public`,
  ]

  const unsubscribes = collectionPaths.map((collectionPath, i) => {
    const q =
      collectionPath === 'public'
        ? query(
            collection(db, collectionPath).withConverter(
              Firestore.converter(Firestore.Warning)
            ),
            where('tweet_time', '!=', null),
            limit(10)
          )
        : query(
            collection(db, collectionPath).withConverter(
              Firestore.converter(Firestore.Warning)
            ),
            limit(10)
          )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const warnings: Warning[] = []
      querySnapshot.docChanges().forEach((change) => {
        if (change.type !== 'added') {
          return
        }
        const doc = change.doc
        const data = change.doc.data()
        if ('tweet_time' in data) {
          warnings.push({
            id: doc.id,
            ...data,
            tweet_time: data.tweet_time.toDate(),
          })
        } else if ('city' in data) {
          warnings.push({
            id: doc.id,
            ...data,
            city: data.city,
            since: data.since.toDate(),
          })
        } else {
          warnings.push({
            id: doc.id,
            ...data,
            since: data.since.toDate(),
            until: data.until.toDate(),
          })
        }
      })
      console.log(warnings)
      onUpdate(warnings)
    })

    return unsubscribe
  })

  const unsubscribe = () => {
    unsubscribes.forEach((unsubscribe) => unsubscribe())
  }

  return unsubscribe
}

type FetchTweetWarningsParam = Record<string, never>

export const fetchTweetWarnings = (
  {}: FetchTweetWarningsParam,
  onUpdate: (warnings: TweetWarning[]) => void
): Unsubscribe => {
  const q = query(
    collection(db, 'public').withConverter(
      Firestore.converter(Firestore.Warning)
    ),
    // TODO: temporary comment out
    // where('until', '>', Timestamp.now())
    orderBy('tweet_time', 'desc'),
    // where('tweet_time', '!=', null),
    limit(10)
  )

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const warnings: TweetWarning[] = []
    querySnapshot.docChanges().forEach((change) => {
      if (change.type !== 'added') {
        return
      }
      const doc = change.doc
      const data = doc.data()

      if ('tweet_time' in data) {
        warnings.push({
          id: doc.id,
          ...data,
          tweet_time: data.tweet_time.toDate(),
        })
      }
    })

    onUpdate(warnings)
  })

  return unsubscribe
}
