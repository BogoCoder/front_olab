import React from 'react';
import "./items.css";

import { FaEdit, } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IconButton } from '@material-ui/core';

const Iteminvent= ({header,articuloinfo}) => {
    var height="50px"
    if (header) {
        height="70px"
    }
    if (!articuloinfo){
        return(<React.Fragment/>)
    }
  const {img,articulo,cantidad} = articuloinfo
  return (
    <React.Fragment>
        <div className={header ? "rowdvd rowinvent grayer":"rowdvd rowinvent"} style={{height:height}}>
            <div className="img">{img}</div>
            <div className="material">{articulo}</div>
            <div className="cantidad">{cantidad}</div>
            {!header &&
            <React.Fragment>
                <div className="btns">
                <IconButton aria-label="edit" size="small" color="primary"><FaEdit /></IconButton>
                <IconButton aria-label="plus1" size="small"color="primary"><TiPlus /></IconButton>
                <IconButton aria-label="minus1" size="small" color="primary"><TiMinus /></IconButton>
                <IconButton aria-label="remove" size="small" color="primary"><FaTrash /></IconButton>
                </div>
            </React.Fragment>
            }
        </div>
    </React.Fragment>
  )
}
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
export {Iteminvent, Itemsugerencias}