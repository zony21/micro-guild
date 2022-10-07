import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';

const SidebarOption = (props) => {
    const user = useSelector(selectUser)
    const router = useRouter();
    const [activeclass, setActiveclass] = useState("")
    return (
        <>
            <ListItem disablePadding className='pc_tab'>
                <ListItemButton component="a" href={`./${props.slug}`}>
                    <ListItemIcon>
                        <props.Icon sx={{ width: 26, height: 26, color: "#db8c6c" }} src={user.photoUrl} />
                    </ListItemIcon>
                    <ListItemText primary={props.text} />
                </ListItemButton>
            </ListItem>
            <li className="sp_nav sp">
                <a href={`./${props.slug}`}><props.Icon sx={{ width: 26, height: 26, color: "#db8c6c" }} src={user.photoUrl} /></a>
            </li>
        </>
    )
}

export default SidebarOption