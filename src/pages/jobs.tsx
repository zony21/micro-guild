import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Post from '../components/Post'
import { GetServerSideProps } from 'next'
import postyle from "../styles/Post.module.scss"
import styles from '../styles/Jobs.module.scss'
import { db } from '../lib/db'
import Searchform from '../components/Searchform'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async (context) => {
  let posts = []
  try {
    // await the promise
    const querySnapshot = await db.collection('posts').orderBy('timestamp', 'desc').get();

    // "then" part after the await
    querySnapshot.forEach(function (doc) {
      posts.push({
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
      })
    })
  } catch (error) {
    alert(`Error getting documents: ${error}`)
  }
  const postsdata = await JSON.parse(JSON.stringify(posts))
  return {
    props: {
      postsdata
    }
  }
}

const Jobs = ({ postsdata }) => {
  const [postlength, setPostLength] = useState(false)
  useEffect(() => {
    if (postsdata.length != 0) {
      setPostLength(true)
    }
  }, [])
  return (
    <Layout>
      <Head>
        <title>募集中求人情報 | Micro Guild</title>
      </Head>
      <main className={`${styles.jobs_main} ${styles.jobs_all_main}`}>
        <div className={postyle.pos_wrap}>
          {
            postsdata.map((post) => {
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
            })
          }
        </div>
      </main>
    </Layout>
  )
}

export default Jobs