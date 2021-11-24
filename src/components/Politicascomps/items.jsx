import React from 'react';
import "./items.css";

import { ImCross } from "react-icons/im";
import { IconButton } from '@material-ui/core';

const Itemusuario= ({userinfo}) => {
  var height="40px"

  const {nombre,posicion} = userinfo
  return (
    <React.Fragment>
        <div className= "rowdvd rowsug" style={{height:height}}>
            <div className="nombre">{nombre}</div>
            <div className="cargo">{posicion}</div>
            <div><IconButton aria-label="remove" size="small" color="primary"><ImCross /></IconButton></div>
        </div>
    </React.Fragment>
  )
}
export {Itemusuario}