import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { db } from '../lib/db'
import { GetServerSideProps } from 'next'
import styles from '../styles/Index.module.scss'
import Post from '../components/Post'
import Searchform from '../components/Searchform'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  let posts = []
  try {
    // await the promise
    const querySnapshot = await db.collection('posts').orderBy('timestamp', 'desc').limit(10).get();

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

const IndexPage = ({ postsdata }) => {
  const [pageopen, setPageopen] = useState(false)
  const timer = useRef<number>();
  useEffect(() => {
    timer.current = window.setTimeout(() => {
      setPageopen(true)
    }, 1000)
  }, [])
  return (
    <Layout>
      <Head>
        <title>求人SNS | Micro Guild</title>
      </Head>
      <section className={`${styles.index_mv} ${pageopen ? styles.index_mv_on : ""}`}>
        <div className={styles.img}>
          <Image src="/img/mv.svg" layout='fill' />
        </div>
        <div className={styles.index_searchform}>
          <div className={styles.index_mv_txt}>
            <span className={styles.index_mv_txt_main}>
              <span className={styles.index_mv_txt_main_in}>
                <span className={styles.index_mv_txt_ani}>E</span><span className={styles.index_mv_txt_ani}>a</span><span className={styles.index_mv_txt_ani}>s</span><span className={styles.index_mv_txt_ani}>i</span><span className={styles.index_mv_txt_ani}>e</span><span className={styles.index_mv_txt_ani}>r</span><span className={styles.index_mv_txt_ani}>&nbsp;</span><span className={styles.index_mv_txt_ani}>t</span><span className={styles.index_mv_txt_ani}>o</span>
              </span>
              <span className={styles.index_mv_txt_main_in}>
                <span className={styles.index_mv_txt_ani}>f</span><span className={styles.index_mv_txt_ani}>i</span><span className={styles.index_mv_txt_ani}>n</span><span className={styles.index_mv_txt_ani}>d</span><span className={styles.index_mv_txt_ani}>&nbsp;</span><span className={styles.index_mv_txt_ani}>a</span><span className={styles.index_mv_txt_ani}>&nbsp;</span><span className={styles.index_mv_txt_ani}>j</span><span className={styles.index_mv_txt_ani}>o</span><span className={styles.index_mv_txt_ani}>b</span>
              </span>
            </span>
            <span className={styles.index_mv_txt_sub}>求人をもっと手軽に</span>
          </div>
          <div className={styles.index_searchform_box}>
            <Searchform />
          </div>
        </div>
      </section>
      <main className={styles.index_main}>
        <section className={styles.index_sort}>
          <div className={styles.index_chiki_wrap}>
            <h2 className={styles.index_h2}>地域で探す</h2>
            <div className={styles.index_chikis}>
              <div className={styles.index_chiki}>
                <Link href="/jobs/search?s=&jparea=&mun=&employment=&unit=&area=area1">
                  <a>北海道</a>
                </Link>
              </div>
              <div className={styles.index_chiki}>
                <Link href="/jobs/search?s=&jparea=&mun=&employment=&unit=&area=area2">
                  <a>東北地方</a>
                </Link>
              </div>
              <div className={styles.index_chiki}>
                <Link href="/jobs/search?s=&jparea=&mun=&employment=&unit=&area=area3">
                  <a>関東地方</a>
                </Link>
              </div>
              <div className={styles.index_chiki}>
                <Link href="/jobs/search?s=&jparea=&mun=&employment=&unit=&area=area4">
                  <a>中部地方</a>
                </Link>
              </div>
              <div className={styles.index_chiki}>
                <Link href="/jobs/search?s=&jparea=&mun=&employment=&unit=&area=area5">
                  <a>近畿地方</a>
                </Link>
              </div>
              <div className={styles.index_chiki}>
                <Link href="/jobs/search?s=&jparea=&mun=&employment=&unit=&area=area6">
                  <a>中国・四国地方</a>
                </Link>
              </div>
              <div className={styles.index_chiki}>
                <Link href="/jobs/search?s=&jparea=&mun=&employment=&unit=&area=area7">
                  <a>九州・沖縄地方</a>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.index_post}>
          <h2 className={styles.index_h2}>新着求人情報</h2>
          <div className={styles.index_pos_wrap}>
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
          <div className={`bt ${styles.index_more}`}><Link href="/jobs"><a className='bt_link'>さらに表示する</a></Link></div>
        </section>
      </main>
    </Layout>
  )
}

export default IndexPage
