import React from "react";
import './InfoPersonal.css';
import Button from '@mui/material/Button';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

function InfoPersonal(){
    let nombre = "Luisa Jaramillo"
    let id = 1064824965
    let contrasena = 'lj2021'
    let email = 'luisa.jaramillo@urosario.edu.co'
    return (
        <React.Fragment>
            <h2 style={{textAlign: 'left'}}>Información Personal</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Item>
                <ul>
                    <li>
                        <h3>Nombre</h3>
                        {nombre}
                    </li>
                    <li style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button variant="contained" >Editar</Button>
                    </li>
                </ul>
                </Item>
                </Grid>
                <Grid item xs={12}>
                <Item>
                <ul>
                    <li>
                        <h3>ID</h3>
                        {id}
                    </li>
                    <li style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button variant="contained">Editar</Button>
                    </li>
                </ul>
                </Item>
                </Grid>
                <Grid item xs={12}>
                <Item>
                <ul>
                    <li>
                        <h3>Contraseña</h3>
                        {'*'.repeat(contrasena.length)}
                    </li>
                    <li style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button variant="contained" >Editar</Button>
                    </li>
                </ul>
                </Item>
                </Grid>
                <Grid item xs={12}>
                <Item>
                <ul>
                    <li>
                        <h3>e-mail</h3>
                        {email}
                    </li>
                    <li style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button variant="contained">Editar</Button>
                    </li>
                </ul>
                </Item>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default InfoPersonal;