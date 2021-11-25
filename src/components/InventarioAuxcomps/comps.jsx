import React, {useState,useRef,useEffect} from 'react';
import {Iteminvent,Itemsugerencias} from "./items"
import "./Scrollableinvent.css"
import "./Scrollablesugs.css"
import "./Cabezera-Busqueda.css"
import SearchBar from "material-ui-search-bar";


/* Imports y cosas para el test nada mas, solo iconos y arrays --------------------------------------------------------*/
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
import { v4 as uuidv4 } from "uuid";


var n_items = 16;
var imgs_test = [
	<SiAirplayvideo />,
	<CgAlarm />,
	<CgBoy />,
	<HiChip />,
	<FcCableRelease />,
	<RiSubwayWifiLine />,
	<GiWifiRouter />,
	<GrSelection />,
	<MdPhotoSizeSelectActual />,
	<FcElectronics />,
	<GiCircuitry />,
	<GiCircularSaw />,
];
var items_test = [
	"Arduino",
	"Chip AND",
	"Chip XOR",
	"Jumper",
	"Motor",
	"Pinzas",
	"Sensor",
	"Boton",
	"Multimetro",
	"Voltimetro",
	"Chip NOT",
	"Ventilador",
	"Resistencias",
	"Bateria",
	"Transistor",
];

const Scrollableinvent= () => {
  const inventario_productos = [...Array(n_items)].map((item) => {
                              return {
                                id: uuidv4(),
                                img: imgs_test[Math.floor(Math.random() * imgs_test.length)],
                                articulo:items_test[Math.floor(Math.random() * items_test.length)],
                                cantidad: Math.floor(Math.random() * 120),
                              }})

  const [datafiltrada, setFiltro] = useState(inventario_productos)
  
  const handlesearch = (busqueda) => {

    const val = String(busqueda)
    console.log(val)
    const filasfiltradas = inventario_productos.filter((row) => {
      return row.articulo.toLowerCase().includes(val.toLowerCase());
      });
      setFiltro(filasfiltradas)
    }
    const cancelsearch = () => {setFiltro(inventario_productos)}


  return (
      <React.Fragment>
          <SearchBar className="busqueda" placeholder="Buscar Material" onChange={(buscado) => handlesearch(buscado)} onCancelSearch={cancelsearch}/>
          <div className="scrollable scrollinvent">
            <Iteminvent header="true" articuloinfo={{img:"",articulo:"Material",cantidad:"Cantidad"}}/>
            {datafiltrada &&
            <React.Fragment>{
              datafiltrada.map( (item)=>(
              <Iteminvent key={item.id} articuloinfo={item}/>
            ))}</React.Fragment>}
          </div>
          <button type="button" className="btntpsr bb">Crear Kit</button>
    </React.Fragment>
  )
}

const SugerenciasCompra= () => {
  const sugerencias_compra = [...Array(n_items)].map((item) => {
    return {
      id: uuidv4(),
      articulo:
        items_test[Math.floor(Math.random() * items_test.length)],
      cantidad: Math.floor(Math.random() * 15),
    }})

  return (
      <React.Fragment>
          <div className="titulo"><div>Sugerencias de compra</div></div>
          <div className="scrollable sugs">
            {sugerencias_compra &&
            <React.Fragment>{
              sugerencias_compra.map( (item)=>(
              <Itemsugerencias key={item.id} articuloinfo={item}/>
            ))}</React.Fragment>}
          </div>
    </React.Fragment>
  )
}

const Cabezera= () => {
  return (
      <React.Fragment>
            <div className="cab">Inventario</div>
    </React.Fragment>
  )
}
export {Scrollableinvent,
        SugerenciasCompra,
        Cabezera
}