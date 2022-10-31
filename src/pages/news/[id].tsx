import Head from "next/head"
import Layout from "../../components/Layout"
import styles from '../../styles/News.module.scss'
import { client } from "../../lib/client"
import moment from 'moment'
import Link from "next/link"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

export default function NewsId({ news }) {
    const metatitle = `${news.title} | Micro Guild`
    const newsdata = moment(news.publishedAt).format('YYYY/MM/DD')
    return (
        <>
            <Layout>
                <Head>
                    <title>{metatitle}</title>
                </Head>
                <main className={`${styles.news_main} com_main`}>
                    <article className={`${styles.news_main_in}`}>
                        <div className={`${styles.news_detail}`}>
                            <time className={`${styles.news_data}`} dateTime={newsdata}>{newsdata}</time>
                            <div className={`${styles.news_tag}`}>お知らせ</div>
                        </div>
                        <h1 className={`${styles.news_h1}`}>{news.title}</h1>
                        <div
                            className={`${styles.news_contents} txt`}
                            dangerouslySetInnerHTML={{
                                __html: `${news.content}`,
                            }}
                        />
                    </article>
                    <div className={`bt ${styles.news_more}`}><Link href="/news"><a className='bt_link'><FormatListBulletedIcon />一覧へ</a></Link></div>
                </main>
            </Layout>
        </>
    )
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "news" })

    const paths = data.contents.map((content) => `/news/${content.id}`)
    return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const data = await client.get({ endpoint: "news", contentId: id })

    return {
        props: {
            news: data,
        },
    }
}