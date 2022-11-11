import moment from 'moment'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../components/Layout'
import { client } from "../../../lib/client"
import { groupBy } from "../../../lib/util"
import styles from '../../../styles/Topics.module.scss'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import Sidebar_topics from '../../../components/Sidebar_topics'

function TopicsCategory({ topics, cats, monthlyIndex, totalCount, title }) {
    return (
        <>
            <Layout>
                <Head>
                    <title>Topics 情報発信 | Micro Guild</title>
                </Head>
                <main className={`${styles.topics_main} com_main`}>
                    <h1 className={`com_h2 under_h1 ${styles.topics_list_h1}`}>
                        Topics<span>情報発信</span>
                    </h1>
                    <h2 className={`com_h2 ${styles.topics_category_list_h2}`}>{title}</h2>
                    <div className={`${styles.topics_main_in}`}>
                        <div className={`${styles.topics_side_menu}`}>
                            <Sidebar_topics cats={cats} monthlyIndex={monthlyIndex} />
                        </div>
                        <div className={`${styles.topics_content_box}`}>
                            <ul className={`${styles.topics_lists}`}>
                                {topics.map((topics) => (
                                    <li className={`${styles.topics_list}`} key={topics.id}>
                                        <Link href={`/topics/${topics.id}`}>
                                            <a>
                                                <div className={`${styles.topics_list_img} img`}><Image src={topics.mv.url} layout='fill' objectFit='cover' alt="Google Japan Blog" /></div>
                                                <div className={`${styles.topics_list_data}`}><QueryBuilderIcon /><span>{moment(topics.publishedAt).format('YYYY/MM/DD')}</span></div>
                                                <div className={`${styles.topics_list_tl}`}>{topics.title}</div>
                                                <ul className={`${styles.topics_tags_list}`}>
                                                    {topics.category.map((tag, index) => {
                                                        return (
                                                            <li className={`${styles.topics_tag_list}`} key={index}>{tag.name}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    )
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "topics" })
    const catdata = await client.get({ endpoint: "categories" })
    const paths = catdata.contents.map((index) => `/topics/category/${index.id}`)
    return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
    const cat = context.params.cat
    const filters = `category[contains]${cat}`

    const data = await client.get({
        endpoint: "topics",
        queries: {
            filters: filters,
        },
    })
    const catnow = await client.get({
        endpoint: "categories",
        queries: {
            filters: `id[equals]${cat}`,
        },
    })
    const catname = catnow.contents.map((cat) => cat.name)
    const alldata = await client.get({ endpoint: "topics", queries: { fields: "publishedAt", limit: 3000 }, })
    const catdata = await client.get({ endpoint: "categories" })
    const monthlyIndex = groupBy(alldata.contents)
    return {
        props: {
            title: `${catname[0]}`,
            topics: data.contents,
            cats: catdata.contents,
            monthlyIndex: monthlyIndex,
            totalCount: alldata.totalCount
        },
    }
}

export default TopicsCategory