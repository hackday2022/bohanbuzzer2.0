import { getAuth, onAuthStateChanged } from 'firebase/auth'
import '../firebase/init'

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  return user
})
