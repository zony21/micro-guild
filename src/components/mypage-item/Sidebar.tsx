import { List } from '@mui/material'
import React, { useState } from 'react'
import SidebarOption from './SidebarOption'
import ApartmentIcon from '@mui/icons-material/Apartment'
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar'
import '../../styles/mypage.module.scss'

const Sidebar = () => {
    return (
        <nav>
            <List>
                <SidebarOption text="ホーム" Icon={HomeIcon} slug="home"/>
                <SidebarOption text="企業情報" Icon={ApartmentIcon} slug="profile"/>
                <SidebarOption text="アカウント" Icon={Avatar} slug="account"/>
            </List>
        </nav>
    )
}

export default Sidebar