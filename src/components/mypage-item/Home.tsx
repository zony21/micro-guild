import React, { useEffect, useState } from 'react'
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import Post from '../Post';
import postyle from "../../styles/Post.module.scss"

interface PROPS {
  id: string;
  title: string;
  text: string;
  postcode: string;
  add1: string;
  add2: string;
  add3: string;
  jobname: string;
  salarytype: string;
  salarymin: string;
  salarymax: string;
  workingstatus: string;
  rlimit: string;
  remail: string;
  remailtxt: string;
  timestamp: any;
  userid: string;
  username: string;
  recruit: string;
}

const Home: React.FC = () => {
  const user = useSelector(selectUser)
  const [myposts, setMyPosts] = useState<PROPS[]>([
    {
      id: "",
      title: "",
      text: "",
      postcode: "",
      add1: "",
      add2: "",
      add3: "",
      jobname: "",
      salarytype: "",
      salarymin: "",
      salarymax: "",
      workingstatus: "",
      rlimit: "",
      remail: "",
      remailtxt: "",
      timestamp: null,
      userid: "",
      recruit: "",
      username: ""
    },
  ])
  const [postlength, setPostLength] = useState(false)
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"), where("userid", "==", user.uid))
    const unSub = onSnapshot(q, (snapshot) => {
      setMyPosts(
        snapshot.docs.map((doc) => (
          {
            id: doc.id,
            title: doc.data().title,
            text: doc.data().text,
            postcode: doc.data().postcode,
            add1: doc.data().add1,
            add2: doc.data().add2,
            add3: doc.data().add3,
            jobname: doc.data().jobname,
            salarytype: doc.data().salarytype,
            salarymin: doc.data().salarymin,
            salarymax: doc.data().salarymax,
            workingstatus: doc.data().workingstatus,
            rlimit: doc.data().rlimit,
            remail: doc.data().remail,
            remailtxt: doc.data().remailtxt,
            timestamp: doc.data().timestamp,
            userid: doc.data().userid,
            recruit: doc.data().recruit,
            username: doc.data().username
          }))
      )
    })
    return () => {
      unSub()
    }
  }, [])
  useEffect(() => {
    if (myposts.length != 0) {
      setPostLength(true)
    }
    
  }, [])
  return (
    <div className={postyle.pos_wrap}>
      {postlength ?
        myposts.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              text={post.text}
              add1={post.add1}
              add2={post.add2}
              add3={post.add3}
              salarytype={post.salarytype}
              salarymax={post.salarymax}
              salarymin={post.salarymin}
              workingstatus={post.workingstatus}
              userid={post.userid}
              rlimit={post.rlimit}
            />
          )
        }) : (
          <>
            <p className={postyle.nonetxt}>投稿はありません</p>
          </>
        )
      }
    </div>
  )
}

export default Home