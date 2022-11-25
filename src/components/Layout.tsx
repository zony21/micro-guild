import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Script from 'next/script'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout