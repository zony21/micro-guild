import React from 'react'
import styles from '../../styles/mypage.module.scss'
import Home from './Home';
import Profile from './Profile'

const Main = (props) => {
    return (
        <main>
            <div className={styles.main_in}>
                {
                    props.page === "/home" ? <Home /> : ""
                }
                {
                    props.page === "/profile" ? <Profile /> : ""
                }
            </div>
        </main>
    )
}

export default Main