import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const SidebarOption = ({ text, Icon, active }) => {
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        </>
    )
}

export default SidebarOption