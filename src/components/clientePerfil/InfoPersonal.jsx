import React, { useState } from 'react';
import './InfoPersonal.css';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ModalContrasena from './modalContrasena';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

function InfoPersonal(props){
    return (
        <React.Fragment>
            <h2 style={{textAlign: 'left', marginBottom:'20px'}}>Información Personal</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Item>
                <ul>
                    <li>
                        <h3>Nombre de Usuario</h3>
                        {props.usuario.nombre}
                    </li>
                </ul>
                </Item>
                </Grid>
                <Grid item xs={12}>
                <Item>
                <ul>
                    <li>
                        <h3>e-mail / ID</h3>
                        {props.usuario.email}
                    </li>
                </ul>
                </Item>
                </Grid>
                <Grid item xs={12}>
                <Item>
                <ul>
                    <li>
                        <h3>Contraseña</h3>
                        {'*'.repeat(8)}
                    </li>
                    <li style={{display: "flex", justifyContent: "flex-end"}}>
                        <ModalContrasena/>
                    </li>
                </ul>
                </Item>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default InfoPersonal;