import React from 'react'
import styles from '../../styles/mypage.module.scss'
import Account from './Account'
import Home from './Home'
import Profile from './Profile'

const Main = (props) => {
    return (
        <main>
            <div className={styles.main_in}>
                {
                    props.page === "/mypage/home" ? (
                        <>
                            <h2 className={`com_h2`}>ホーム</h2>
                            <h3>自分の求人</h3>
                            <Home />
                        </>
                    ) : ""
                }
                {
                    props.page === "/mypage/profile" ? (
                        <>
                            <h2 className={`com_h2`}>企業情報</h2>
                            <h3>情報更新</h3>
                            <Profile />
                        </>
                    ) : ""
                }
                {
                    props.page === "/mypage/account" ? (
                        <>
                            <h2 className={`com_h2`}>アカウント</h2>
                            <Account />
                        </>
                    ) : ""
                }
            </div>
        </main>
    )
}

export default Main