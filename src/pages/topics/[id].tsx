import Head from "next/head"
import Layout from "../../components/Layout"
import styles from '../../styles/Topics.module.scss'
import { client } from "../../lib/client"
import moment from 'moment'
import Link from "next/link"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import Sidebar_topics from "../../components/Sidebar_topics"
import { groupBy } from "../../lib/util"

const TopicsId = ({ topics, cats, monthlyIndex, id }) => {
    const metatitle = `${topics.title} | Micro Guild`
    const topicsdata = moment(topics.publishedAt).format('YYYY/MM/DD')
    return (
        <>
            <Layout>
                <Head>
                    <title>{metatitle}</title>
                    <meta property="og:url" content={`https://www.micro-guild.com/topics/${id}`} />
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={metatitle} />
                    <meta property="og:description" content={metatitle} />
                    <meta property="og:site_name" content="Micro Guild" />
                    <meta property="og:image" content={topics.mv.url} />
                </Head>
                <main className={`${styles.topics_main} com_main`}>
                    <div className={`${styles.topic_main_in}`}>
                        <div className={`${styles.topics_article_box} ${styles.topics_content_box}`}>
                            <article className={`${styles.topic_article_in}`}>
                                <div className={`${styles.topics_detail}`}>
                                    <ul className={`${styles.topics_detail_tags}`}>
                                        {topics.category.map((tag, index) => {
                                            return (
                                                <li className={`${styles.topics_detail_tag}`} key={index}>{tag.name}</li>
                                            )
                                        })}
                                    </ul>
                                    <time className={`${styles.topics_data}`} dateTime={topicsdata}>{topicsdata}</time>
                                </div>
                                <div className={`${styles.topics_content}`}>
                                    <h1 className={`${styles.topics_h1}`}>{topics.title}</h1>
                                    {topics.content.map((body, index) => {
                                        return body.fieldId === 'richEditor' ? (
                                            <div key={index} className={styles.letterBody}>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: body.richEditor }}
                                                />
                                            </div>
                                        ) : body.fieldId === 'html' ? (
                                            <div key={index} className={styles.letterBody}>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: body.html }}
                                                />
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </article>
                            <div className={`bt ${styles.topics_more}`}><Link href="/topics/page/1"><a className='bt_link'><FormatListBulletedIcon />一覧へ</a></Link></div>
                        </div>
                        <div className={`${styles.topics_side_menu}`}>
                            <Sidebar_topics cats={cats} monthlyIndex={monthlyIndex} />
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    )
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "topics" })

    const paths = data.contents.map((content) => `/topics/${content.id}`)
    return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const data = await client.get({ endpoint: "topics", contentId: id })
    const catdata = await client.get({ endpoint: "categories" });
    const alldata = await client.get({ endpoint: "topics", queries: { fields: "publishedAt", limit: 3000 }, })
    const monthlyIndex = groupBy(alldata.contents)

    return {
        props: {
            id: id,
            topics: data,
            cats: catdata.contents,
            monthlyIndex: monthlyIndex
        },
    }
}

export default TopicsId