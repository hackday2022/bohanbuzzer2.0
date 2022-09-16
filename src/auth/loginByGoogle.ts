import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import '../firebase/init'

const auth = getAuth()
const provider = new GoogleAuthProvider()

export default function GoogleLogin(router: any) {
  signInWithPopup(auth, provider)
    .then((authUser) => {
      console.log('Login completed', authUser)
      router.push('/signin')
      return authUser
    })
    .catch((error) => {
      console.log(error, error.code, error.message)
      return null
    })
}
