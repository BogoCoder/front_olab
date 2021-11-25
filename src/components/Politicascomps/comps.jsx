import React, {useState, useEffect} from 'react';
import {Itemusuario} from "./items"
import "./comps.css"
import "./items.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { BsPlusCircle } from "react-icons/bs";
import { IconButton } from '@material-ui/core';
import { v4 as uuidv4 } from "uuid";
import { rutaApi} from '../rutas';
import { Modal, Button } from "react-bootstrap";
import { GiToken } from 'react-icons/gi';
import { SiElasticsearch } from 'react-icons/si';
import { ImCross } from "react-icons/im";

const Accesibilityconfigscomp=() => {
  const token = localStorage.getItem("token");

  const defconfig = [
                      {
                          "categoria": "abierta",
                          "horas_reserva": "",
                          "dias_prestamo": "",
                          "max_renovaciones": ""
                      },
                      {
                          "categoria": "restringida",
                          "horas_reserva": "",
                          "dias_prestamo": "",
                          "max_renovaciones": ""
                      },
                      {
                          "categoria": "confidencial",
                          "horas_reserva": "",
                          "dias_prestamo": "",
                          "max_renovaciones": ""
                      }
                  ];

  // Estados Iniciales
  const [content, setContent] = useState(defconfig);
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(prev => !prev);
  };

      // Consultas de la API
  // Función para obtener las configuraciones
  const getConfigs = (setData) => {
    const ruta = rutaApi + '/politicas';

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
        console.log(token)
      }
      else{
        setData(res);
      }
      //
      return res;
    })
    .catch((err) => {
      setData(defconfig);
      //console.log(err);
    });
  };

  const setConfigs = () => {
    const ruta = rutaApi + '/politicas/actualizarPoliticas';
    console.log(content)

    fetch(ruta, {
      method: "PUT",
      headers: {
        "token-acceso": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    })
    .then((res) => {
      console.log(content)
      return res.json();
    })
    .then((res) => {
      console.log(res)
      openModal();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Cargar datos al iniciar
  useEffect(() => {
  getConfigs(setContent);
  },[])
  const guardarconfigs = () => {
    setConfigs();
  }
  function Number_buttom({defValue}){
    return (

    <input id="s" type="number" min="0" max="150" defaultValue={defValue}></input>
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
        <Modal show={showModal} onHide={openModal}>

          <Modal.Body>Guardado Correctamente</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={openModal}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
  </React.Fragment>)
}

const Scrolluserscomp= ({title,kind}) => {
  const token = localStorage.getItem("token");
  // const defconfig = [
  //                   {nombre:"Juan Gonzales",posicion:"Profesor"},
  //                   {nombre:"David Martinez",posicion:"Estudiante"},
  //                   {nombre:"Samuel Perez",posicion:"Profesor"},
  //                   {nombre:"Pedro Martinez",posicion:"Profesor"},
  //                   {nombre:"Sandra Saenz",posicion:"Estudiante"},
  //                   {nombre:"Miguel Gutierrez",posicion:"Profesor"},
  //                 ]
  const defconfig = []
  const [content, setContent] = useState(defconfig);
  const [showModal1,setModal1] = useState(false);
  const [showModal2,setModal2] = useState(false);
  const [searchval, setSearchval] = useState("")
  const [allcorreos, setAllcorreos] = useState([])

  // Función para obtener las personas
  const getusers = () => {
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
        setContent(defconfig);
        console.log(res)
      }
      else{
        setContent(res);
      }
      //
      return res;
    })
    .catch((err) => {
      setContent(defconfig);
      console.log(err);
    });
  };

  // Funcion para obtener todos los correos y así agregar
  const getallusers = () =>{
    const ruta = rutaApi + '/usuarios';

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
        console.log(res)
        setAllcorreos([])
      }
      else{
        //console.log(res)
        setAllcorreos(res);
      }
      //
      return res;
    })
    .catch((err) => {
      setAllcorreos([]);
      console.log(err);
    });
  }

  //Funcion para añadir una persona, entra el correo
  const adduser = (correo) => {
    const ruta = rutaApi + '/politicas/agregarUsuario';
    const data = {"correo":correo, "categoria":kind}
    fetch(ruta, {
      method: "PUT",
      headers: {
        "token-acceso": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res)
      getusers()
      setModal1(true);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  //Funcion para eliminar una persona, entra el correo
  const removeuser = (correo) => {
    const ruta = rutaApi + '/politicas/eliminarUsuario';
    const data = {"correo":correo}
    fetch(ruta, {
      method: "PUT",
      headers: {
        "token-acceso": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res)
      getusers()
      setModal2(true);
    })
    .catch((err) => {
      console.log(err);
    });
}
  // Cargar datos al iniciar
  useEffect(() => {
  getusers();
  },[])
  useEffect(() => {
    getallusers();
    },[])

  function SearchInput() {
    return (
      <Autocomplete
      id="inputSearch"
      value={searchval}
      onChange={(event, newval) => {setSearchval(newval)}}
      freeSolo
      size="small"
      sx={{ width: '80%',height:"2%"}}
      options={allcorreos.map((user) => user.correo)}
      renderInput={(params) => <TextField {...params} label="Buscar por correo" margin="normal"/>}
      />
    );
  }
  const handleaddusr = () => {
      console.log(searchval)
      if (searchval != "" &&  searchval != null){
        adduser(searchval)
      }
  }
  return (
      <React.Fragment>
          <div className="titulo2"><div>{title}</div></div>
          <div className="searchdvd">
            <SearchInput />
            <div className="addbtn2"><IconButton aria-label="adduser" onClick={handleaddusr} color="primary"><BsPlusCircle className="iconogrande"/></IconButton></div>
          </div>
          <div className="scrollable usersdvd">
            {content &&
            <React.Fragment >{
              content.map( (user)=>(
                <React.Fragment key={ uuidv4()}>
                <div className= "rowdvd rowsug" style={{height:'40px'}}>
                    <div className="nombre">{user.nombre}</div>
                    <div className="cargo">{user.posicion}</div>
                    <div><IconButton aria-label="remove" size="small" color="primary" onClick={()=>removeuser(user.correo)}><ImCross /></IconButton></div>
                </div>
            </React.Fragment>
            ))}</React.Fragment>}
          </div>

          
          <Modal show={showModal1} onHide={()=>{setModal1(false)}}>
                  <Modal.Body>Añadido Correctamente</Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={()=>{setModal1(false)}}>
                      Ok
                    </Button>
                  </Modal.Footer>
                  </Modal>


          <Modal show={showModal2} onHide={()=>{setModal2(false)}}>
          <Modal.Body>Eliminado Correctamente</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>{setModal2(false)}}>
              Ok
            </Button>
          </Modal.Footer>
          </Modal>
    </React.Fragment>
  )
}

export {Scrolluserscomp,
        Accesibilityconfigscomp}