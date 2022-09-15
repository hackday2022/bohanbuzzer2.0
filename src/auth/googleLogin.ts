import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import '../firebase/init'

const auth = getAuth()
const provider = new GoogleAuthProvider()

export const GoogleLogin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Login completed', result)
      return result
    })
    .catch((error) => {
      console.log(error, error.code, error.message)
    })
}
