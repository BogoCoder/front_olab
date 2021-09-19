import React from 'react';
import "./iteminvent.css";
import "./itemsugerencias.css"
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
            <div className="img">{img}</div>
            <div className="material">{articulo}</div>
            {header && <div></div>}
            <div className="cantidad">{cantidad}</div>
            {!header &&
            <React.Fragment>
                <div className="btns">
                    <button>i</button>
                    <button>i</button>
                    <button>i</button>
                    <button>i</button>
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
            <div className="material">{articulo}</div>
            <div className="cantidad">{cantidad}</div>
            <div><button>x</button></div>
        </div>
    </React.Fragment>
  )
}
export {Iteminvent, Itemsugerencias}