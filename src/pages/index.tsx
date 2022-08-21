import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'


const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>求人SNS | Micro Guild</title>
      </Head>
      <Link href="/recruit">
        <div className="bt"><span>仕事を募集する</span></div>
      </Link>
      <Link href="/job">
        <div className="bt"><span>仕事を探す</span></div>
      </Link>
    </>
  )
}

export default IndexPage
