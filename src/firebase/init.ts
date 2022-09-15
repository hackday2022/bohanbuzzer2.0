import { initializeApp } from "firebase/app"

// 実務ではこんなことすると怒られますがハッカソンなので許容すべき
const firebaseConfig = {
  apiKey: "AIzaSyDvufiQB3YBxzxCFigXUCOmIvqgsKMPV5Y",
  authDomain: "hackday-2022-126c3.firebaseapp.com",
  projectId: "hackday-2022-126c3",
  storageBucket: "hackday-2022-126c3.appspot.com",
  messagingSenderId: "992478333427",
  appId: "1:992478333427:web:241ac68993a941718e6a86"
}

export const app = initializeApp(firebaseConfig)

