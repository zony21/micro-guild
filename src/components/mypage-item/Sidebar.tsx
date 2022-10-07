import { List } from '@mui/material'
import React, { useState } from 'react'
import SidebarOption from './SidebarOption'
import ApartmentIcon from '@mui/icons-material/Apartment'
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar'
import '../../styles/mypage.module.scss'
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import styles from '../../styles/sidbar.module.scss'

const Sidebar = () => {
    return (
        <nav>
            <List>
                <SidebarOption text="ホーム" Icon={HomeIcon} slug="home" />
                <SidebarOption text="企業情報" Icon={ApartmentIcon} slug="profile" />
                <SidebarOption text="アカウント" Icon={Avatar} slug="account" />
            </List>
            <div className={`${styles.side_logout} pc_tab`}>
                <button
                    className={`${styles.logout}`}
                    onClick={() => {
                        var result = confirm('ログアウトしますか？')
                        if (result) { signOut(auth) }
                    }}
                >
                    <LogoutIcon sx={{ width: 26, height: 26, color: 'var(--main-color)' }} />ログアウト
                </button>
            </div>
        </nav>
    )
}

export default Sidebar