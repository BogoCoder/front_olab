import React, {useState,useRef} from 'react';
import {Itemusuario} from "./items"
import "./comps.css"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { BsPlusCircle } from "react-icons/bs";
import { IconButton } from '@material-ui/core';

const Accesibilityconfigscomp=({content}) => {

  function Number_buttom({defValue}){
    return (

    <input id="s" type="number" min="0" max="72" defaultValue={defValue}></input>
    )
  }
  function Fila_configs({nombre, abierta, restringida, confidencial}){
    return(
          <div className="filaccess" >

            {!nombre && 
                        <React.Fragment>
                        <div></div>
                        <div>{abierta}</div>
                        <div>{restringida}</div>
                        <div>{confidencial}</div>
                        </React.Fragment>
            }
            {nombre && 
                        <React.Fragment>
                        <div>{nombre}</div>
                        <div><Number_buttom defValue={abierta}/></div>
                        <div><Number_buttom defValue={restringida}/></div>
                        <div><Number_buttom defValue={confidencial}/></div>
                        </React.Fragment>
            }
          </div>
    )
  }
  const guardarconfigs = () => {}
  return (
    <React.Fragment>
        <div className="titulo2"><div>Configuraciones en periodicidad de préstamos</div></div>
        <div className="subtitledvd">Categorias de Accesibilidad</div>
        <div className="accessdvd">
          <Fila_configs abierta="Abierta" restringida="Restringida" confidencial="Confidencial" />
          <Fila_configs nombre="Tiempo de reserva (horas)" abierta={content.abierta.reserva} restringida={content.restringida.reserva} confidencial={content.confidencial.reserva} />
          <Fila_configs nombre="Tiempo de préstamo (días)" abierta={content.abierta.prestamo} restringida={content.restringida.prestamo} confidencial={content.confidencial.prestamo} />
          <Fila_configs nombre="Máximo de renovaciones" abierta={content.abierta.renov} restringida={content.restringida.renov} confidencial={content.confidencial.renov} />
        </div>
        <button type="button" className="btnsearchaccess btntpsr" onClick={guardarconfigs}>Guardar</button>
  </React.Fragment>
)
}

const Scrolluserscomp= ({title,content}) => {
  function SearchInput() {
    return (
      <Autocomplete
      id="inputSearch"
      freeSolo
      size="small"
      sx={{ width: '50%',height:"2%"}}
      options={content.map((user) => user.nombre)}
      renderInput={(params) => <TextField {...params} label="Buscar por nombre" margin="normal"/>}
      />
    );
  }
  const handlesearch = () => {}
  return (
      <React.Fragment>
          <div className="titulo2"><div>{title}</div></div>
          <div className="searchdvd">
            <SearchInput />
            <button type="button" className="btnsearch2 btntpsr" onClick={handlesearch}>Buscar</button>
            <div className="addbtn2"><IconButton aria-label="adduser" color="primary"><BsPlusCircle className="iconogrande"/></IconButton></div>
          </div>
          <div className="scrollable usersdvd">
            {content &&
            <React.Fragment>{
              content.map( (user)=>(
              <Itemusuario key={user.id} userinfo={user}/>
            ))}</React.Fragment>}
          </div>
    </React.Fragment>
  )
}

export {Scrolluserscomp,
        Accesibilityconfigscomp}