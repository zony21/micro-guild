import { collection, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Auth from '../components/Auth'
import Mypage from '../components/Mypage'
import { login, logout, selectUser } from '../features/userSlice'
import { auth, db } from '../firebase'


const Recruit = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const docRef = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
            company: docSnap.data().company,
            tel: docSnap.data().tel,
            postcode: docSnap.data().postcode,
            add1: docSnap.data().add1,
            add2: docSnap.data().add2,
            add3: docSnap.data().add3,
          }))
        } else {
          dispatch(login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
            company: "",
            tel: "",
            postcode: "",
            add1: "",
            add2: "",
            add3: "",
          }))
        }
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
        <title>{`${user.uid ? ("Mypage") : ("ログイン")} | Micro Guild`}</title>
      </Head>
      {
        user.uid ? (<Mypage />) : (<Auth />)
      }
    </>
  )
}

export default Recruit