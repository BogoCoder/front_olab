import React, {useState,useRef} from 'react';
import {Iteminvent,Itemsugerencias} from "./items"
import "./Scrollableinvent.css"
import "./Scrollablesugs.css"
import "./Cabezera-Busqueda.css"
const Scrollableinvent= ({content}) => {

  /*const [items,setItems] = useState([{img:"",
                                      articulo:"Articulo",
                                      cantidad:"Cantidad"}])

  setItems((previtems) => {
    return [...previtems,{img,articulo,cantidad}]
  })*/
  return (
      <React.Fragment>
          <div className="scrollable scrollinvent">
            <Iteminvent header="true" articuloinfo={{img:"",articulo:"Material",cantidad:"Cantidad"}}/>
            {content &&
            <React.Fragment>{
              content.map( (item)=>(
              <Iteminvent key={item.id} articuloinfo={item}/>
            ))}</React.Fragment>}
          </div>
          <button type="button" className="btntpsr bb">Crear Kit</button>
    </React.Fragment>
  )
}

const SugerenciasCompra= ({content}) => {

  return (
      <React.Fragment>
          <div className="titulo"><div>Sugerencias de compra</div></div>
          <div className="scrollable sugs">
            {content &&
            <React.Fragment>{
              content.map( (item)=>(
              <Itemsugerencias key={item.id} articuloinfo={item}/>
            ))}</React.Fragment>}
          </div>
    </React.Fragment>
  )
}

const Busqueda= ({content}) => {
  const searchref = useRef();
  const [search,setSearch] = useState("")

  const handleChange = () => {}

  const handlesearch = () => {
    const value = searchref.current.value
    if (value === "") return;

    setSearch((prevsearch) => {
      return [...prevsearch,value]
      })
      searchref.current.value = null
  }
  return (
      <React.Fragment>
            <input className="busqueda" ref={searchref}type="text" placeholder="Buscar por nombre" onChange={handleChange} />
            <button type="button" className="btnsearch btntpsr" onClick={handlesearch}>Buscar</button>
    </React.Fragment>
  )
}

const Cabezera= ({content}) => {
  return (
      <React.Fragment>
            <div className="cab">Inventario</div>
    </React.Fragment>
  )
}
export {Scrollableinvent,
        SugerenciasCompra,
        Cabezera,
        Busqueda
}