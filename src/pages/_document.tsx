import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from "react";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
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
                    {/* 1: Google Tag Manager ---------------------------- */}
                    <script dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PQXSBWQ');`,
                    }} />
                    {/* -------------------------------------------------- */}
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3880001846776098" crossOrigin="anonymous" />
                </Head>
                <body>
                    {/* 2: Google Tag Manager ---------------------------- */}
                    <noscript dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQXSBWQ" height="0" width="0" style="display:none;visibility:hidden" />`,
                    }} />
                    {/* -------------------------------------------------- */}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}