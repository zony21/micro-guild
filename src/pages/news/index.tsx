import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'
import Layout from '../../components/Layout';
import { client } from "../../lib/client";
import styles from '../../styles/News.module.scss'

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "news" });

    return {
        props: {
            news: data.contents,
        },
    };
}

function News({ news }) {
    const newsdata = moment(news.publishedAt).format('YYYY/MM/DD')
    return (
        <>
            <Layout>
                <Head>
                    <title>NEWS お知らせ | Micro Guild</title>
                </Head>
                <main className={`${styles.news_main} com_main`}>
                    <h1 className={`com_h2 under_h1 ${styles.news_list_h1}`}>
                        NEWS<span>お知らせ</span>
                    </h1>
                    <ul className={`${styles.news_lists}`}>
                        {news.map((news) => (
                            <li className={`${styles.news_list}`} key={news.id}>
                                <Link href={`/news/${news.id}`}>
                                    <a>
                                        <div className={`${styles.news_list_data}`}>{newsdata}</div>
                                        <div className={`${styles.news_list_tl}`}>{news.title}</div>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </main>
            </Layout>
        </>
    )
}

export default News