import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Layout from '../../../components/Layout';
import { client } from "../../../lib/client"
import { groupBy } from "../../../lib/util"
import styles from '../../../styles/Topics.module.scss'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import Sidebar_topics from '../../../components/Sidebar_topics';
import Pagination from '../../../components/Pagination';

const PER_PAGE = 6

function TopicsPageId({ topics, cats, monthlyIndex, totalCount, nowpage }) {
    const topicsdata = moment(topics.publishedAt).format('YYYY/MM/DD')
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
                                                <div className={`${styles.topics_list_data}`}><QueryBuilderIcon /><span suppressHydrationWarning={true}>{topicsdata}</span></div>
                                                <div className={`${styles.topics_list_tl}`} suppressHydrationWarning={true}>{topics.title}</div>
                                                <ul className={`${styles.topics_tags_list}`}>
                                                    {topics.category.map((tag, index) => {
                                                        return (
                                                            <li className={`${styles.topics_tag_list}`} key={index} suppressHydrationWarning={true}>{tag.name}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Pagination totalCount={totalCount} nowpage={nowpage}/>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    )
}

export const getStaticPaths = async () => {
    const repos = await client.get({ endpoint: "topics" });
    const pageNumbers = [];
    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/topics/page/${repo}`);
    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "topics", queries: { offset: (id - 1) * PER_PAGE, limit: PER_PAGE } })
    const alldata = await client.get({ endpoint: "topics", queries: { fields: "publishedAt", limit: 3000 }, })
    const catdata = await client.get({ endpoint: "categories" })
    const monthlyIndex = groupBy(alldata.contents)
    return {
        props: {
            topics: data.contents,
            cats: catdata.contents,
            monthlyIndex: monthlyIndex,
            totalCount: alldata.totalCount,
            nowpage: id
        },
    };
}

export default TopicsPageId