import _formatDistanceToNow from 'date-fns/formatDistanceToNow'
import format from 'date-fns/format'
import { utcToZonedTime } from 'date-fns-tz'
import ja from 'date-fns/locale/ja'

export const formatDistanceToNow = (date: Date) => {
  const zonedTime = utcToZonedTime(date, 'Asia/Tokyo')
  try {
    // HACK: ビルドエラーを回避するため
    return _formatDistanceToNow(zonedTime, {
      locale: ja,
      addSuffix: true,
    })
  } catch (e) {
    return '-'
  }
}

export const formatDate = (date: Date) => {
  try {
    // HACK: ビルドエラーを回避するため
    return format(date, 'M月d日')
  } catch (e) {
    console.log(e)
    return '-'
  }
}
