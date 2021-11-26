import React from 'react';
import "./items.css";

import { ImCross } from "react-icons/im";
import { IconButton } from '@material-ui/core';

const Itemsugerencias= ({articuloinfo}) => {
    var height="50px"

  const {articulo,cantidad} = articuloinfo
  return (
    <React.Fragment>
        <div className= "rowdvd rowsug" style={{height:height}}>
            <div className="material">{articulo}</div>
            <div className="cantidad">{cantidad}</div>
            <div><IconButton aria-label="remove" size="small" color="primary"><ImCross /></IconButton></div>
        </div>
    </React.Fragment>
  )
}
export {Itemsugerencias}