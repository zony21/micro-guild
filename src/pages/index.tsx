import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { db } from '../lib/db'
import { GetServerSideProps } from 'next'
import styles from '../styles/Index.module.scss'
import Post from '../components/Post'
import Searchform from '../components/Searchform'
import { useEffect, useRef, useState } from 'react'
import MainVisual from "../../public/img/mv.svg"
import { client } from "../lib/client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import moment from 'moment'

const IndexPage = ({ postsdata, news, topics }) => {
  const [pageopen, setPageopen] = useState(false)
  const topicsdata = moment(topics.publishedAt).format('YYYY/MM/DD')
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
        <div className={styles.index_mv_in}>
          <div className={styles.img}>
            <MainVisual />
          </div>
          <div className={styles.index_searchform}>
            <div className={styles.index_mv_txt}>
              <span className={styles.index_mv_txt_main}>
                <span className={styles.index_mv_txt_main_in}>
                  <span className={styles.index_mv_txt_ani}>J</span>
                  <span className={styles.index_mv_txt_ani}>o</span>
                  <span className={styles.index_mv_txt_ani}>b</span>
                  <span className={styles.index_mv_txt_ani}>&nbsp;</span>
                  <span className={styles.index_mv_txt_ani}>p</span>
                  <span className={styles.index_mv_txt_ani}>o</span>
                  <span className={styles.index_mv_txt_ani}>s</span>
                  <span className={styles.index_mv_txt_ani}>t</span>
                  <span className={styles.index_mv_txt_ani}>i</span>
                  <span className={styles.index_mv_txt_ani}>n</span>
                  <span className={styles.index_mv_txt_ani}>g</span>
                </span>
                <span className={styles.index_mv_txt_main_in}>
                  <span className={styles.index_mv_txt_ani}>m</span>
                  <span className={styles.index_mv_txt_ani}>a</span>
                  <span className={styles.index_mv_txt_ani}>d</span>
                  <span className={styles.index_mv_txt_ani}>e</span>
                  <span className={styles.index_mv_txt_ani}>&nbsp;</span>
                  <span className={styles.index_mv_txt_ani}>e</span>
                  <span className={styles.index_mv_txt_ani}>a</span>
                  <span className={styles.index_mv_txt_ani}>s</span>
                  <span className={styles.index_mv_txt_ani}>y</span>
                </span>
              </span>
              <span className={styles.index_mv_txt_sub}>求人をもっと手軽に</span>
            </div>
            <div className={`${styles.index_mv_bt} bt`}>
              <Link href="/mypage/home">
                <a className={`${styles.bt_link}`}><span>求人を無料で掲載する</span><ArrowForwardIcon /></a>
              </Link>
            </div>
            {/* <div className={styles.index_searchform_box}>
              <Searchform />
            </div> */}
          </div>
          {/* <div className={`${styles.index_news_box}`}>
            <Swiper
              direction={"vertical"}
              loop={true}
              pagination={{
                clickable: false,
              }}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {
                news.map((news, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Link href={`/news/${news.id}`}>
                        <a className={`${styles.index_news_atag}`}>
                          <div className={`${styles.index_news_in}`}>
                            <div className={`${styles.index_news_data}`}>{news.publishedAt.slice(0, -14)}</div>
                            <div className={`${styles.index_news_tl}`}>{news.title}</div>
                          </div>
                        </a>
                      </Link>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div> */}
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
        <section className={styles.index_topics}>
          <h2 className={styles.index_h2}>情報発信</h2>
          <ul className={`${styles.index_topics_lists}`}>
            {topics.map((topics) => (
              <li className={`${styles.index_topics_list}`} key={topics.id}>
                <Link href={`/topics/${topics.id}`}>
                  <a>
                    <div className={`${styles.index_topics_list_img} img`}><Image src={topics.mv.url} layout='fill' objectFit='cover' alt="Google Japan Blog" /></div>
                    <div className={`${styles.index_topics_list_data}`}><QueryBuilderIcon /><span>{topicsdata}</span></div>
                    <div className={`${styles.index_topics_list_tl}`}>{topics.title}</div>
                    <ul className={`${styles.index_topics_tags_list}`}>
                      {topics.category.map((tag, index) => {
                        return (
                          <li className={`${styles.index_topics_tag_list}`} key={index}>{tag.name}</li>
                        )
                      })}
                    </ul>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className={`bt ${styles.index_more}`}><Link href="/topics/page/1"><a className='bt_link'>さらに表示する</a></Link></div>
        </section>
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await client.get({
    endpoint: 'news',
    queries: { limit: 5 }
  })
  const topidata = await client.get({
    endpoint: 'topics',
    queries: { limit: 3 }
  })
  let posts = []
  try {
    const querySnapshot = await db.collection('posts').orderBy('timestamp', 'desc').limit(10).get();
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
      postsdata,
      news: data.contents,
      topics: topidata.contents
    }
  }
}

export default IndexPage