import React from 'react';
import {ReactComponent as OLabLogo} from '../../assets/olab_logo.svg';
import "./Header_Olab.css";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const HeaderOlab = ({tipousuario,nombre}) => {
  console.log(tipousuario)
  if (!(tipousuario && nombre)){
    console.log("No Hay usuario")
    return (
      <React.Fragment>
        <p className="aligncenter">
        <OLabLogo/>
        </p>
      </React.Fragment>
    )
  }
  else{
  return (
    <React.Fragment>
      <div className="conti">
        <div className="Titulo">Laboratorio Tesla</div>
        <div className="Nombreuser">{tipousuario} {nombre}</div>
        <div className="Dibujo1">{<BsFillBellFill/>}</div>
        <div className="Dibujo2">{<FaUserCircle/>}</div>
      </div>
    </React.Fragment>
  )}
}

export default HeaderOlab;