import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'


const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>求人SNS | Micro Guild</title>
      </Head>
      <Link href="/mypage/home">
        <div className="bt"><span>仕事を募集する</span></div>
      </Link>
      <Link href="/job">
        <div className="bt"><span>仕事を探す</span></div>
      </Link>
    </Layout>
  )
}

export default IndexPage
