import Head from 'next/head'
import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
    return (
        <>
            <Head>
            </Head>
            <Header />
            {children}
        </>
    )
}

export default Layout