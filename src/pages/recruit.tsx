import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Auth from '../components/Auth'
import Mypage from '../components/Mypage'
import { login, logout, selectUser } from '../features/userSlice'
import { auth } from '../firebase'


const Recruit = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photoUrl: authUser.photoURL,
          displayName: authUser.displayName
        }))
      } else {
        dispatch(logout())
      }
    })
    return () => {
      unSub()
    }
  }, [dispatch])
  return (
    <>
      <Head>
        <title>{`${ user.uid ? ("Mypage") : ("ログイン") } | Micro Guild`}</title>
      </Head>
      {
        user.uid ? (<Mypage />) : (<Auth />)
      }
    </>
  )
}

export default Recruit