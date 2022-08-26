import React from 'react'
import styles from '../../styles/mypage.module.scss'
import Profile from './Profile'

const Main = () => {
    return (
        <main>
            <div className={styles.main_in}>
                <Profile />
            </div>
        </main>
    )
}

export default Main