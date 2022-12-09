import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Layout from '../components/Layout'
import styles from '../styles/About.module.scss'

const About = () => {
    return (
        <Layout>
            <Head>
                <title>このサイトについて | Micro Guild</title>
            </Head>
            <main className={`${styles.about_main} com_main`}>
                <div className={`${styles.about_contents_wrap}`}>
                    <section className={`${styles.about_sec1} ${styles.about_sec}`}>
                        <h1 className={`com_h2 under_h1 ${styles.about_h1}`} id='sec1'>
                            このサイトについて
                        </h1>
                        <div className={`${styles.about_contents_txt} txt`}>
                            「Micro Guild」は、求人募集をより気軽にSNS感覚で投稿できる求人サイトです。
                        </div>
                    </section>
                    <section className={`${styles.about_sec2} ${styles.about_sec}`} id='sec2'>
                        <h2 className={`com_h3 ${styles.about_h2}`}>
                            できること
                        </h2>
                        <ul>
                            <li>
                                <h3 className={`${styles.about_h3}`}>無料で求人を投稿</h3>
                                <div className={`${styles.about_contents_txt} txt`}>
                                    求人掲載は、契約不要・初期費用・成功報酬は不要です。<span className={`${styles.about_contents_tyu}`}>※投稿数・投稿期間に制限がございます。</span>
                                </div>
                            </li>
                            <li>
                                <h3 className={`${styles.about_h3}`}>Google for jobsに登録</h3>
                                <div className={`${styles.about_contents_txt} txt`}>
                                    Googleが提供するキーワードにマッチする求人情報を検索結果に表示するサービス「Google for jobs」に自動で登録することができます。
                                    <div className={`img ${styles.img}`}>
                                        <Image src="/img/about/googleforjobs.png" layout='fill' objectFit='contain' alt="Google Japan Blog" />
                                    </div>
                                    <div className={`${styles.quote}`}>
                                        引用:<a href="https://jobs.google.com/about/intl/ja_ALL/" target="_blank" rel="noopener">https://jobs.google.com/about/intl/ja_ALL/</a>より
                                    </div>
                                </div>
                            </li>
                            <li>
                                <h3 className={`${styles.about_h3}`}>掲載求人検索</h3>
                                <div className={`${styles.about_contents_txt} txt`}>
                                    フリーワード・地域・雇用形態・給与額の区分から検索可能です。
                                </div>
                            </li>
                        </ul>
                    </section>
                    <section className={`${styles.about_sec3} ${styles.about_sec}`} id='sec3'>
                        <h2 className={`com_h3 ${styles.about_h2}`}>
                            免責事項
                        </h2>
                        <div className={`${styles.about_contents_txt} txt`}>
                            当サイトの内容やリンク先で生じた損失･損害について一切の責任を負いかねますので、ご了承ください。
                        </div>
                    </section>
                </div>
                <div className={`${styles.about_contents_side}`}>
                    <ul className={`${styles.about_nav}`}>
                        <li><a href="#">このサイトについて</a></li>
                        <li><a href="#sec2">できること</a></li>
                        <li><a href="#sec3">免責事項</a></li>
                    </ul>
                </div>
            </main>
        </Layout>
    )
}

export default About