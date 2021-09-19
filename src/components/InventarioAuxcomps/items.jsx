import React from 'react';
import "./iteminvent.css";
import "./itemsugerencias.css"
import { FaEdit, } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { CgAlarm } from "react-icons/cg";
import { CgBoy } from "react-icons/cg";
import { HiChip } from "react-icons/hi";
import { FcCableRelease } from "react-icons/fc";
import { RiSubwayWifiLine } from "react-icons/ri";
import { GiWifiRouter } from "react-icons/gi";
import { GrSelection } from "react-icons/gr";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FcElectronics } from "react-icons/fc";
import { GiCircuitry } from "react-icons/gi";
import { GiCircularSaw } from "react-icons/gi";
import { SiAirplayvideo } from "react-icons/si";

import { IconButton } from '@material-ui/core';

var imgs_test = [<SiAirplayvideo/>,<CgAlarm/>,<CgBoy/>,
    <HiChip/>,<FcCableRelease/>,<RiSubwayWifiLine/>,
    <GiWifiRouter/>,<GrSelection/>,<MdPhotoSizeSelectActual/>,
    <FcElectronics/>,<GiCircuitry/>,<GiCircularSaw/>]
var articulos_test = ["Arduino","Chip","Articulo x","Articulo y","Router","Jumper","Motor","Pinzas","Sensor","Boton","Multimetro","Voltimetro","Metro"]

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
        <div className={header ? "row rowinvent grayer":"row rowinvent"} style={{height:height}}>
            {!header && <div className="img">{imgs_test[Math.floor(Math.random() * imgs_test.length)]}</div>}
            {header && <React.Fragment><div></div>
                <div className="material">Material</div>
                <div className="cantidad">Cantidad</div>
                </React.Fragment>
            }
            {!header && <React.Fragment>
                <div className="material">{articulos_test[Math.floor(Math.random() * articulos_test.length)]}</div>
            <div className="cantidad">{Math.floor(Math.random() * 120)}</div>
                </React.Fragment>
            }
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
        <div className= "row rowsug" style={{height:height}}>
            <div className="material">{articulos_test[Math.floor(Math.random() * articulos_test.length)]}</div>
            <div className="cantidad">{Math.floor(Math.random() * 10)}</div>
            <div><IconButton aria-label="remove" size="small" color="primary"><ImCross /></IconButton></div>
        </div>
    </React.Fragment>
  )
}
export {Iteminvent, Itemsugerencias}