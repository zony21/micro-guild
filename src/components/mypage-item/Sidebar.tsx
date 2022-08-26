import { List } from '@mui/material'
import React from 'react'
import SidebarOption from './SidebarOption'
import HomeIcon from '@mui/icons-material/Home'
import ApartmentIcon from '@mui/icons-material/Apartment';
import '../../styles/mypage.module.scss'

const Sidebar = () => {
    return (
        <nav>
            <List>
                <SidebarOption  text="ホーム" Icon={HomeIcon} active={undefined}/>
                <SidebarOption  text="企業情報" Icon={ApartmentIcon} active={undefined}/>
            </List>
        </nav>
    )
}

export default Sidebar