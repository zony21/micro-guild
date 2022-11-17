import Script from 'next/script'

const Dashboard = () => {
    return (
        <>
            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3880001846776098`}
                crossOrigin="anonymous"
            />
        </>
    )
}

export default Dashboard