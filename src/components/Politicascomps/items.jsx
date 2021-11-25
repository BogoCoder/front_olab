import React, {useState, useEffect} from 'react';
import "./items.css";
import { rutaApi} from '../rutas';
import { Modal, Button } from "react-bootstrap";
import { ImCross } from "react-icons/im";
import { IconButton } from '@material-ui/core';

const Itemusuario= ({userinfo}) => {
  const token = localStorage.getItem("token");
  var height="40px"
  const [showModal,setModal] = useState(false);

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
      setModal(true);
    })
    .catch((err) => {
      console.log(err);
    });
}
  const {nombre,posicion, correo} = userinfo
  return (
    <React.Fragment>
        <div className= "rowdvd rowsug" style={{height:height}}>
            <div className="nombre">{nombre}</div>
            <div className="cargo">{posicion}</div>
            <div><IconButton aria-label="remove" size="small" color="primary" onClick={()=>removeuser(correo)}><ImCross /></IconButton></div>
        </div>
        <Modal show={showModal} onHide={()=>{setModal(false)}}>
          <Modal.Body>Añadido Correctamente</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>{setModal(false)}}>
              Ok
            </Button>
          </Modal.Footer>
          </Modal>
    </React.Fragment>
  )
}
export {Itemusuario}