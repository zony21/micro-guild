import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Script from 'next/script'

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <meta content="通常料金無料の求人サイト。SNSのように手軽に求人情報を投稿できます。" name="Description" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                <link rel="manifest" href="/favicons/site.webmanifest" />
                <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#faf9f8" />
                <meta name="theme-color" content="#faf9f8"></meta>
                <meta name="google-site-verification" content="d4ZbSEaezTdFZDMlHqEKKC12iSwTY6-pey0Xq0fGMbo" />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3880001846776098"
                    crossOrigin="anonymous">
                </script>
            </Head>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout