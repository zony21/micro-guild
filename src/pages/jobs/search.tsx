import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Post from '../../components/Post'
import { GetServerSideProps, InferGetServerSidePropsType, GetStaticProps } from 'next'
import postyle from "../../styles/Post.module.scss"
import styles from '../../styles/Jobs.module.scss'
import { db } from '../../lib/db'
import { useRouter } from 'next/router'
import Head from 'next/head'

const areatype = {
  area1: { name: "北海道", areain: ["北海道"] },
  area2: { name: "東北地方", areain: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"] },
  area3: { name: "関東地方", areain: ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"] },
  area4: { name: "中部地方", areain: ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"] },
  area5: { name: "近畿地方", areain: ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"] },
  area6: { name: "中国・四国地方", areain: ["鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県"] },
  area7: { name: "九州・沖縄地方", areain: ["福岡県", "滋賀県", "長崎県", "熊本県", "大分県", "宮城県", "鹿児島県", "沖縄県"] },
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let posts = []
  try {
    const querySnapshot = await db.collection('posts').orderBy('timestamp', 'desc').get()
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
    console.log(`Error getting documents: ${error}`)
  }
  const postsdata = await JSON.parse(JSON.stringify(posts))
  return {
    props: {
      postsdata
    }
  }
}

const Search = ({ postsdata }) => {
  const router = useRouter()
  const [jparealist, setJparealist] = useState([])
  const [jparealiston, setJparealiston] = useState(true)
  const [employmentlist, setEmploymentlist] = useState([])
  const [unitlist, setUnitlist] = useState([])
  var { area, jparea, employment, unit, mun }: any = router.query
  if (area) {
    var areanum = areatype[area.toString()].areain
    var areaname = areatype[area.toString()].name
  } else if (jparea && Array.isArray(jparea) === true) {
    var areanum = [...jparea]
  } else if (jparea && Array.isArray(jparea) === false) {
    var areanum = [jparea]
  } else if (jparea && area) {
    var areanum: any = areatype[area.toString()].areain.concat(jparea)
  } else {
    var areanum: any = [
      '北海道',
      '青森県',
      '岩手県',
      '宮城県',
      '秋田県',
      '山形県',
      '福島県',
      '茨城県',
      '栃木県',
      '群馬県',
      '埼玉県',
      '千葉県',
      '東京都',
      '神奈川県',
      '新潟県',
      '富山県',
      '石川県',
      '福井県',
      '山梨県',
      '長野県',
      '岐阜県',
      '静岡県',
      '愛知県',
      '三重県',
      '滋賀県',
      '京都府',
      '大阪府',
      '兵庫県',
      '奈良県',
      '和歌山県',
      '鳥取県',
      '島根県',
      '岡山県',
      '広島県',
      '山口県',
      '徳島県',
      '香川県',
      '愛媛県',
      '高知県',
      '福岡県',
      '佐賀県',
      '長崎県',
      '熊本県',
      '大分県',
      '宮崎県',
      '鹿児島県',
      '沖縄県'
    ]
  }
  if (employment && Array.isArray(employment) === true) {
    var employments: any = [...employment]
  }else if(employment && Array.isArray(employment) === false){
    var employments: any = [employment]
  } else {
    var employments: any = ['正社員', 'パート・アルバイト', '契約社員', '派遣社員', 'インターンシップ', 'ボランティア', '日雇い', 'その他']
  }
  if (unit && Array.isArray(unit) === true) {
    var units: any = [...unit]
  }else if(unit && Array.isArray(unit) === false){
    var units: any = [unit]
  } else {
    var units: any = ['時給', '日給', '週休', '月給', '年収']
  }
  const { s } = router.query
  const metatitle = `求人検索 ${s ? `${s},` : ""}${jparea ? `${jparea},` : ""}${areaname ? `${areaname},` : ""}${employment ? `${employment},` : ""}${unit ? `${unit},` : ""}| Micro Guild`
  const [postlength, setPostLength] = useState(false)
  useEffect(() => {
    if (postsdata.length != 0) {
      setPostLength(true)
    }
    if (jparea && Array.isArray(jparea)) {
      setJparealist([...jparea])
    } else {
      setJparealist([jparea])
    }
    if (employment && Array.isArray(employment)) {
      setEmploymentlist([...employment])
    } else {
      setEmploymentlist([employment])
    }
    if (unit && Array.isArray(unit)) {
      setUnitlist([...unit])
    } else {
      setUnitlist([unit])
    }
  }, [])
  useEffect(() => {
    if (typeof jparealist[0] === "undefined") {
      setJparealiston(false)
    } else {
      setJparealiston(true)
    }
  })
  return (
    <Layout>
      <Head>
        <title>{metatitle}</title>
      </Head>
      <main className={styles.jobs_main}>
        <h2 className={`${styles.search_word_box}`}>
          <div className={styles.search_word_tl}>検索条件:</div>
          <ul className={styles.search_words}>
            {s ? <li className={styles.search_word}>キーワード:{s}</li> : ""}
            {areaname ? <li className={styles.search_word}>{areaname}</li> : ""}
            {mun || jparealiston && !areaname ? <li className={styles.search_word}>地域:{jparealist.join(",")}{mun ? ` ${mun}` : ""}</li> : ""}
            {employmentlist.map((item1, index) =>
              <li key={index} className={styles.search_word}>{item1}</li>
            )}
            {unitlist.map((item2, index) =>
              <li key={index} className={styles.search_word}>{item2}</li>
            )}
          </ul>
        </h2>
        <div className={postyle.pos_wrap}>
          {
            postsdata
              .filter((arease) => areanum.some(value1 => value1 === arease.add1))
              .filter((muns) => muns.add2.match(`${mun}`))
              .filter((unitset) => units.some(value2 => value2 === unitset.salarytype))
              .filter((employment) => employments.some(value3 => value3 === employment.workingstatus))
              .filter((postsea) => postsea.title.match(`${s}`) || postsea.text.match(`${s}`) || postsea.jobname.match(`${s}`))
              .map((post,index) => {
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
                    index={index}
                  />
                )
              })
          }
        </div>
      </main>
    </Layout>
  )
}

export default Search