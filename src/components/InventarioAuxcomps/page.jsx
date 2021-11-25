import React, {useState,useRef} from 'react';
import { SugerenciasCompra, Scrollableinvent, Cabezera} from "./comps";
import "./page.css"


const Inventariopage= () => {
    return (
        <React.Fragment>
            <div className="cont">
            <div className="divheader"><Cabezera/></div>
            <div className="divinvent"><Scrollableinvent /></div>
            <div className="divsugs"><SugerenciasCompra /></div>
            </div>
      </React.Fragment>
    )
  }
  export default Inventariopage;