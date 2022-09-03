import { List } from '@mui/material'
import React, { useState } from 'react'
import SidebarOption from './SidebarOption'
import HomeIcon from '@mui/icons-material/Home'
import ApartmentIcon from '@mui/icons-material/Apartment';
import '../../styles/mypage.module.scss'

const Sidebar = () => {
    return (
        <nav>
            <List>
                <SidebarOption text="ホーム" Icon={HomeIcon} slug="home"/>
                <SidebarOption text="企業情報" Icon={ApartmentIcon} slug="profile"/>
            </List>
        </nav>
    )
}

export default Sidebar