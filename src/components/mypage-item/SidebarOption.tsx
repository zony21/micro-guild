import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const SidebarOption = (props) => {
    const router = useRouter();
    const [activeclass, setActiveclass] = useState("")
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton component="a" href={`./${props.slug}`}>
                    <ListItemIcon>
                        <props.Icon />
                    </ListItemIcon>
                    <ListItemText primary={props.text} />
                </ListItemButton>
            </ListItem>
        </>
    )
}

export default SidebarOption