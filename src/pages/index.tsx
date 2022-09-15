import type { NextPage } from 'next'
import React from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import '../firebase/init'
import { GoogleLogin } from '../auth/googleLogin'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <button onClick={() => GoogleLogin()}>ログイン</button>
    </div>
  )
}

export default Home
