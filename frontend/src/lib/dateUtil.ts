import _formatDistanceToNow from 'date-fns/formatDistanceToNow'
import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'
import ja from 'date-fns/locale/ja'

export const formatDistanceToNow = (date: Date) => {
  const zonedTime = utcToZonedTime(date, 'Asia/Tokyo')
  return _formatDistanceToNow(zonedTime, {
    locale: ja,
    addSuffix: true,
  })
}

export const formatDate = (date: Date) => {
  return format(date, 'M月d日')
}
