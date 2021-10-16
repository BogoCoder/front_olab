import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MdAccountCircle }  from "react-icons/md";
import { MdChromeReaderMode } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";


function SeccionLateral(){
    return(
    <React.Fragment>
        <nav aria-label="main mailbox folders">
            <h2>Mi Cuenta</h2>
            <List>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <MdAccountCircle />
                </ListItemIcon>
                <ListItemText primary="Mi perfil" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <MdChromeReaderMode />
                </ListItemIcon>
                <ListItemText primary="Mis prestamos" />
                </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <MdShoppingCart />
                </ListItemIcon>
                <ListItemText primary="Mi carrito de prestamos" />
                </ListItemButton>
            </ListItem> */}
            </List>
        </nav>
    </React.Fragment>
    );
}

export default SeccionLateral;