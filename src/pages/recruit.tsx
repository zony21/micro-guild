import { collection, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Auth from '../components/Auth'
import Mypage from '../components/Mypage'
import { login, logout, selectUser } from '../features/userSlice'
import { auth, db } from '../firebase'
import FadeLoader from "react-spinners/ClipLoader";


const Recruit = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const docRef = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: docSnap.data().displayName,
            company: docSnap.data().company,
            hpurl: docSnap.data().hpurl,
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
            displayName: "",
            hpurl: "",
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
      setLoading(false);
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
      {!loading ?
        user.uid ? (<Mypage />) : (<Auth />)
        :
        (
          <div className="loader_wrap">
            <FadeLoader color="#db8c6c"/>
          </div>
        )
      }
    </>
  )
}

export default Recruit