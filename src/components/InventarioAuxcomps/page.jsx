import React from 'react';
import { SugerenciasCompra, Scrollableinvent, Cabezera, Busqueda} from "./comps";
import "./page.css"
const Inventariopage= ({inventario,sugerencias}) => {

    return (
        <React.Fragment>
            <div className="cont">
            <div className="divheader"><Cabezera/></div>
            <div className="divbusqueda"><Busqueda/></div>
            <div className="divinvent"><Scrollableinvent content={inventario}/></div>
            <div className="divsugs"><SugerenciasCompra content={sugerencias}/></div>
            </div>
      </React.Fragment>
    )
  }
  export default Inventariopage;