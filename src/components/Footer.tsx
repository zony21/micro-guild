import Link from 'next/link'
import React from 'react'
import styles from '../styles/footer.module.scss'

const Footer = () => {
    return (
        <footer className={styles.com_footer}>
            <div className={styles.f_in}>
                <div className={`logo ${styles.f_sitename}`}>
                    <Link href="/">
                        <a>Micro Guild</a>
                    </Link>
                </div>
                <div className={styles.link_box}>
                    <ul className={styles.main_links}>
                        <li className={styles.main_link}>
                            <Link href="/">
                                <a>ホーム</a>
                            </Link>
                        </li>
                        <li className={styles.main_link}>
                            <Link href="/jobs">
                                <a>仕事を探す</a>
                            </Link>
                        </li>
                        <li className={styles.main_link}>
                            <Link href="/mypage/home">
                                <a>仕事を募集する</a>
                            </Link>
                        </li>
                    </ul>
                    <ul className={styles.sub_links}>
                        <li className={styles.sub_link}>
                            <Link href="/about">
                                <a>このサイトについて</a>
                            </Link>
                        </li>
                        <li className={styles.sub_link}>
                            <Link href="/howto">
                                <a>求人掲載方法</a>
                            </Link>
                        </li>
                        <li className={styles.sub_link}>
                            <Link href="/privacy">
                                <a>プライバシーポリシー</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer