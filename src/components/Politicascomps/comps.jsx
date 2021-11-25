import React, {useState, useEffect} from 'react';
import {Itemusuario} from "./items"
import "./comps.css"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { BsPlusCircle } from "react-icons/bs";
import { IconButton } from '@material-ui/core';
import { v4 as uuidv4 } from "uuid";
import { rutaApi} from '../rutas';

const Accesibilityconfigscomp=() => {
  const token = localStorage.getItem("token");
  // Estados Iniciales
  const defconfig = [
                      {
                          "categoria": "abierta",
                          "horas_reserva": "-1",
                          "dias_prestamo": "-1",
                          "max_renovaciones": "-1"
                      },
                      {
                          "categoria": "restringida",
                          "horas_reserva": "-1",
                          "dias_prestamo": "-1",
                          "max_renovaciones": "-1"
                      },
                      {
                          "categoria": "confidencial",
                          "horas_reserva": "-1",
                          "dias_prestamo": "-1",
                          "max_renovaciones": "-1"
                      }
                  ];

  const [content, setContent] = useState(defconfig);


  // Función para obtener las ocnfiguraciones
  const getConfigs = (setData) => {
    const ruta = rutaApi + '/politicas';

    // Consultar a la API
    fetch(ruta, {
      method: "GET",
      headers: {
        "token-acceso": token,
      },
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      //console.log(res)
      if (typeof res === "string"){
        setData(defconfig);
        console.log(res)
      }
      else{
        setData(res);
      }
      //
      return res;
    })
    .catch((err) => {
      setData(defconfig);
      console.log(err);
    });
  };

  // Cargar datos al iniciar
  useEffect(() => {
  getConfigs(setContent);
  },[])

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
          <Fila_configs nombre="Tiempo de reserva (horas)" abierta={content[0].horas_reserva} restringida={content[1].horas_reserva} confidencial={content[2].horas_reserva} />
          <Fila_configs nombre="Tiempo de préstamo (días)" abierta={content[0].dias_prestamo} restringida={content[1].dias_prestamo} confidencial={content[2].dias_prestamo} />
          <Fila_configs nombre="Máximo de renovaciones" abierta={content[0].max_renovaciones} restringida={content[1].max_renovaciones} confidencial={content[2].max_renovaciones} />
        </div>
        <button type="button" className="btnsearchaccess btntpsr" onClick={guardarconfigs}>Guardar</button>
  </React.Fragment>)
}

const Scrolluserscomp= ({title,kind}) => {
  const token = localStorage.getItem("token");
  const defconfig = [
                    {nombre:"Juan Gonzales",posicion:"Profesor"},
                    {nombre:"David Martinez",posicion:"Estudiante"},
                    {nombre:"Samuel Perez",posicion:"Profesor"},
                    {nombre:"Pedro Martinez",posicion:"Profesor"},
                    {nombre:"Sandra Saenz",posicion:"Estudiante"},
                    {nombre:"Miguel Gutierrez",posicion:"Profesor"},
                  ]
  const [content, setContent] = useState(defconfig);
  // Función para obtener las personas
  const getConfigs = (setData) => {
    const ruta = rutaApi + '/politicas/usuarios/'+kind;

    // Consultar a la API
    fetch(ruta, {
      method: "GET",
      headers: {
        "token-acceso": token,
      },
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      //console.log(res)
      if (typeof res === "string"){
        setData(defconfig);
        console.log(res)
      }
      else{
        console.log(res)
        setData(res);
      }
      //
      return res;
    })
    .catch((err) => {
      setData(defconfig);
      console.log(err);
    });
  };

  // Cargar datos al iniciar
  useEffect(() => {
  getConfigs(setContent);
  },[])

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
              <Itemusuario key={uuidv4()} userinfo={user}/>
            ))}</React.Fragment>}
          </div>
    </React.Fragment>
  )
}

export {Scrolluserscomp,
        Accesibilityconfigscomp}