import React, {useState,useRef,useEffect} from 'react';
import {Itemsugerencias} from "./items"
import "./Scrollableinvent.css"
import "./Scrollablesugs.css"
import "./Cabezera-Busqueda.css"
import SearchBar from "material-ui-search-bar";
import {rutaApi} from '../rutas';
import "./items.css";
import { v4 as uuidv4 } from "uuid";
import { IconButton } from '@material-ui/core';
import { FaEdit, } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { BsPlusCircle } from "react-icons/bs";
// Crear estilos
const useStyles = makeStyles({
  boxTablaAuxiliares: { 
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%', 
    height : '42vh',
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)',
    margin: '0 7% 41% 8%',
    position: 'absolute',
  },
  boxEstadisticasHorarios: {
    backgroundColor: 'transparent',
    width: '90%', 
    height : '42vh',
    margin: '45vh 7% 2% 8%',
  },
  boxInferiores: {
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    margin: '0',
    height: '42vh'
  },
  titulos: {
    marginTop:'1%', 
    marginLeft:'2%', 
    color:'#576271', 
    fontSize:'18px', 
    fontFamily:'Open Sans',
    display: 'table',
    padding: '1px 6px',
  },
  tableContainer: {
    maxHeight: '75%',
    marginTop:'5px',
    marginLeft: '3%',
    maxWidth: '94%',
    "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
      borderRadius: 8,
      border: "1.5px solid #1750A6"
    },
  },
  table: {
    width: '100%',
    height: "150px"
  },
  tableRow: {
    height: 20
  },
  tableCell: {
    padding: "0px 6px",
  },
  botonNuevoUsuario: {
    height: '35%',
    width: '75%',
    backgroundColor: '#ededed',
    textTransform: 'none',
    color: '#013570'
  }
});


var n_items = 16;

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
const EditItem = ((token,item, forceuptd) => {
  const ruta = rutaApi + '/inventario/modificar/'+item.serial;
  const data = {"cantidad":item.cantidad,
                "nombre":item.nombre,
                "ubicacion":item.ubicacion}
  fetch(ruta, {
    method: "POST",
    headers: {
      "token-acceso": token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    return res.json()
    
  })
  .then((res) =>{
    
    if (forceuptd){
      forceuptd()
      console.log(res);
    }
  })
  .catch((err) => {
    console.log(err);
  });

})

const CreateItem = ((token,item, forceuptd) => {
  const ruta = rutaApi + '/inventario/crear';

  fetch(ruta, {
    method: "POST",
    headers: {
      "token-acceso": token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then((res) => {
    return res.json()
    
  })
  .then((res) =>{
    
    if (forceuptd){
      forceuptd()
      console.log(res);
    }
  })
  .catch((err) => {
    console.log(err);
  });

})

const Createkit = ((token,item, forceuptd) => {
  const ruta = rutaApi + '/kits/crearkit';

  fetch(ruta, {
    method: "POST",
    headers: {
      "token-acceso": token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then((res) => {
    return res.json()
    
  })
  .then((res) =>{
    
    if (forceuptd){
      forceuptd()
      console.log(res);
    }
  })
  .catch((err) => {
    console.log(err);
  });

})
const Modaledititem = ({
  showModal,
  hideModal,
  serial,
  nombre,
  cantidad,
  ubicacion,
  forceuptd
}) => {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  // Estado para almacenar correo ingresado
  //const [textoSerial, setTextoSerial] = useState(serial);
  const [textonombre, setTextoNombre] = useState(nombre);
  const [textocantidad, setTextoCantidad] = useState(cantidad);
  const [textoubicacion, setTextoUbicacion] = useState(ubicacion);

  const handleTextonombre = (event) => {
    
    setTextoNombre(event.target.value);
  };
  const handleTextocantitad = (event) => {
    setTextoCantidad(event.target.value);
  };
  const handleTextoubicacion = (event) => {
    setTextoUbicacion(event.target.value);
  };

  const cerrarModal = () =>{
    hideModal();
  };
  const handleadd = () =>{
    const data_to_send = {"serial":serial,
                          "nombre":textonombre,
                          "cantidad":textocantidad,
                          "ubicacion":textoubicacion}
    if (textonombre === ""){
      setTextoNombre(nombre)
      data_to_send.nombre = nombre
    }
    if (textocantidad === ""){
      console.log("soloo")
      setTextoCantidad(cantidad)
      data_to_send.cantidad = cantidad
    }
    if (textoubicacion === ""){
      setTextoUbicacion(ubicacion)
      data_to_send.ubicacion = ubicacion
    }

    console.log(data_to_send)
    EditItem(token,data_to_send, forceuptd)
    setTextoNombre("")
    setTextoCantidad("")
    setTextoUbicacion("")
    hideModal()
  };
  return (
    <Modal size="lg" show={showModal} onHide={cerrarModal} centered backdrop="static">
    
      <Modal.Header closeButton>
				<Modal.Title> Editar un Articulo </Modal.Title>
			</Modal.Header>

      <Modal.Body>
      <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader className={classes.table} aria-label="tabla-auxiliares" border={0}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell} align="left"> Serial </TableCell>
                <TableCell className={classes.tableCell} align="left"> Nombre </TableCell>
                <TableCell className={classes.tableCell} align="left"> Cantidad </TableCell>
                <TableCell className={classes.tableCell} align="left"> Ubicación </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
          <TableRow key={serial} className={classes.tableRow}>
          <TableCell className={classes.tableCell} align="left">{serial}</TableCell>

          <TableCell className={classes.tableCell} align="left"><TextField
            label="Nombre"
            variant="filled"
            style={{width: '90%'}}
            defaultValue={nombre}
            onChange={handleTextonombre}
          /></TableCell>
          <TableCell className={classes.tableCell} align="left"><TextField
            label="Cantidad"
            variant="filled"
            defaultValue={cantidad}
            style={{width: '90%'}}
            onChange={handleTextocantitad}
          /></TableCell>
          <TableCell className={classes.tableCell} align="left"><TextField
            label="Lugar"
            defaultValue={ubicacion}
            variant="filled"
            style={{width: '90%'}}
            onChange={handleTextoubicacion}
          /></TableCell>

          </TableRow>
          </TableBody>
          </Table>
        </TableContainer>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={cerrarModal} className={classes.botonesFoot}>
          Cancelar
        </Button>
        <Button onClick={() => {handleadd()}} 
          className={classes.botonesFoot}
        >
          Agregar
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

const Modalcreateitem = ({
  showModal,
  hideModal,
  forceuptd
}) => {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  // Estado para almacenar correo ingresado
  //const [textoSerial, setTextoSerial] = useState(serial);
  const [newitem, setnewitem] = useState({"serial":"",
                                          "nombre":"",
                                          "tipo":"obj",
                                          "cantidad":"",
                                          "ubicacion":""});

  const handleTextoserial = (event) => {
    newitem.serial = event.target.value
    console.log(newitem)
  };                                         
  const handleTextonombre = (event) => {
    newitem.nombre = event.target.value
    console.log(newitem)
  };
  const handleTextocantidad = (event) => {
    newitem.cantidad = event.target.value
    console.log(newitem)
  };
  const handleTextoubicacion = (event) => {
    newitem.ubicacion = event.target.value
    console.log(newitem)
  };

  const cerrarModal = () =>{
    hideModal();
  };
  const handlecreate = () =>{
    console.log(["Se enviara", newitem])
    CreateItem(token, newitem, forceuptd)
    setnewitem({"serial":"",
                "nombre":"",
                "tipo":"",
                "cantidad":""})
    hideModal()
  };
  return (
    <Modal size="lg" show={showModal} onHide={cerrarModal} centered backdrop="static">
    
      <Modal.Header closeButton>
				<Modal.Title> Agregar un Articulo nuevo</Modal.Title>
			</Modal.Header>

      <Modal.Body>
      <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader className={classes.table} aria-label="tabla-auxiliares" border={0}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell} align="left"> Serial </TableCell>
                <TableCell className={classes.tableCell} align="left"> Nombre </TableCell>
                <TableCell className={classes.tableCell} align="left"> Cantidad </TableCell>
                <TableCell className={classes.tableCell} align="left"> Ubicacion </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
          <TableRow key={uuidv4()} className={classes.tableRow}>
          <TableCell className={classes.tableCell} align="left"><TextField
            label="Serial"
            variant="filled"
            style={{width: '90%'}}
            onChange={handleTextoserial}
          /></TableCell>

          <TableCell className={classes.tableCell} align="left"><TextField
            label="Nombre"
            variant="filled"
            style={{width: '90%'}}
            onChange={handleTextonombre}
          /></TableCell>
          <TableCell className={classes.tableCell} align="left"><TextField
            label="Cantidad"
            variant="filled"
            style={{width: '90%'}}
            onChange={handleTextocantidad}
          /></TableCell>
          <TableCell className={classes.tableCell} align="left"><TextField
            label="Ubicacion"
            variant="filled"
            style={{width: '90%'}}
            onChange={handleTextoubicacion}
          /></TableCell>

          </TableRow>
          </TableBody>
          </Table>
        </TableContainer>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={cerrarModal} className={classes.botonesFoot}>
          Cancelar
        </Button>
        <Button onClick={() => {handlecreate()}} 
          className={classes.botonesFoot}
        >
          Agregar
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

const Modalcreatekit = ({
  showModal,
  hideModal,
  forceuptd,
}) => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [kititems, setkititems] = useState([])
  const [all_data, setall_data] = useState([])
  const [newkit, setNewkit] = useState({"kit_id":uuidv4(),
                                        "nombre":"",
                                        "categoria":"",
                                        "items":[]})
  const [mapdata, setmapdata] = useState(1)
  const [searchval, setSearchval] = useState("")

  const getInvent = () => {
    const ruta = rutaApi + '/inventario/consultar_aux';

    fetch(ruta, {
      method: "GET",
      headers: {
        "token-acceso": token,
      },
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      
      if (typeof res === "string"){
        setall_data([]);
      }
      else{
        const aux = res.map((item)=>Object.assign({},item,{"solicitado":0, "estado":"disponible"}))
        setall_data(aux);
      }
      return res;
    })
    .catch((err) => {
      setall_data([]);
      console.log(err);
    });
  };
  useEffect(()=>{
    getInvent()
  },[])

  const cerrarModal = () =>{
    hideModal();
  };
  const handlecreate = () =>{
    if (kititems.length === 0 || newkit.nombre === "" || newkit.categoria === ""){
      console.log("Nada para enviar")
      return
    }
    newkit.items = kititems
    console.log(newkit)
    Createkit(token, newkit, forceuptd)
    setNewkit({"kit_id":uuidv4(),
              "nombre":"",
              "categoria":"",
              "items":[]})
    hideModal()
  };

  const pluscant=(item) =>{
    item.solicitado = item.solicitado + 1
    setmapdata( mapdata + 1)
  }
  const minuscant=(item) =>{
    if (item.solicitado > 0) {
    item.solicitado = item.solicitado - 1
    setkititems(kititems.filter((item)=>item.solicitado >0))
    setmapdata( mapdata + 1)
    }
  }
  function SearchInput() {
    return (
      <Autocomplete
      id="inputSearch"
      value={searchval}
      onChange={(event, newval) => {setSearchval(newval)}}
      freeSolo
      size="small"
      sx={{width: '100%',height:"100%"}}
      options={all_data.map((user) => user.nombre)}
      renderInput={(params) => <TextField {...params} label="Buscar por nombre" margin="normal"/>}
      />
    );
  }
  const handleaddtokit=()=>{
    const aux = all_data.filter((item)=>(item.nombre === searchval))[0]
    if (kititems.some(elem=> searchval === elem.nombre)){
        pluscant(aux)
    }
    else{
      console.log(aux)
      aux.solicitado = aux.solicitado+1
      kititems.push(aux)
      setmapdata(mapdata + 1)
    }
    
  }
  const handleTextonombrekit = (event) => {
    newkit.nombre = event.target.value
    console.log(newkit)
  };
  const handleTextocatkit = (event) => {
    newkit.categoria = event.target.value
    console.log(newkit)
  };
  return (
    <Modal fullscreen={true} aria-labelledby="example-custom-modal-styling-title" show={showModal} onHide={cerrarModal} centered backdrop="static">
    
      <Modal.Header closeButton>
				<Modal.Title> Crear Kit</Modal.Title>
			</Modal.Header>

      <Modal.Body>
        <div className="divmodalkit">
        <div className="inp4589"><SearchInput /></div>
        <div className="lbl1">Nombre del kit:</div>
        <div className="inp4590"><TextField
                                  label="Nombre"
                                  variant="filled"
                                  style={{width: '90%'}}
                                  onChange={handleTextonombrekit}/>
        </div>
        <div className="lbl2">Categoria del kit:</div>
        <div className="inp4591"><TextField
                                  label="Categoria"
                                  variant="filled"
                                  style={{width: '90%'}}
                                  onChange={handleTextocatkit}/>
        </div>
      <div className="btn4589"><IconButton aria-label="adduser" onClick={()=>handleaddtokit()} color="primary"><BsPlusCircle /></IconButton></div>
      <div className="scrollable2">
          <div className={"rowdvd rowinvent grayer"} style={{height:"70px"}}>
          <div className="material">Articulo</div>
          <div className="cantidad">Cantidad</div>
          </div>
            {(kititems && mapdata) &&
            <React.Fragment>{
              kititems.map( (item)=>(

                <React.Fragment  key={ uuidv4()}>
                <div className={"rowdvd rowinvent"} style={{height:"50px"}}>
                    <div className="material">{item.nombre}</div>
                    <div className="cantidad">{item.solicitado}</div>
                        <div className="btns">,
                        <IconButton onClick={()=>pluscant(item)} aria-label="plus1" size="small"color="primary"><TiPlus /></IconButton>
                        <IconButton onClick={()=>minuscant(item)} aria-label="minus1" size="small" color="primary"><TiMinus /></IconButton>
                        </div>
                </div>
                
            </React.Fragment>

            ))}</React.Fragment>}
          </div>
          </div>
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={cerrarModal} className={classes.botonesFoot}>
          Cancelar
        </Button>
        <Button onClick={() => {handlecreate()}} 
          className={classes.botonesFoot}
        >
          Agregar
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

const Scrollableinvent= () => {
  const token = localStorage.getItem("token");
  const [inventario_productos, setInventario] = useState([])
  const [showModaledit, setShowModaledit] = useState(false);
  const [serialactive, setserialactive] = useState("");
  const [nombreactive, setnombreactive] = useState("");
  const [cantidadactive, setcantidadactive] = useState("");
  const [ubicacionactive, setubicacionactive] = useState("");
  const [updatte, setUpdatte] = useState(0)
  const [showModalcreateitem, setShowModalcreateitem] = useState(false)
  const [showModalcreatekit, setShowModalcreatekit] = useState(false)

    // Consultas de la API
  // Función para obtener las configuraciones
  const getInvent = () => {
    const ruta = rutaApi + '/inventario/consultar_aux';

    fetch(ruta, {
      method: "GET",
      headers: {
        "token-acceso": token,
      },
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      
      if (typeof res === "string"){
        setInventario([]);
      }
      else{
        setFiltro(res)
        setInventario(res);
        
      }
      return res;
    })
    .catch((err) => {
      setInventario([]);
      console.log(err);
    });
  };
  useEffect(()=>{
    getInvent()
  },[updatte])

  const [datafiltrada, setFiltro] = useState(inventario_productos)
  
  const handlesearch = (busqueda) => {

    const val = String(busqueda)
    console.log(inventario_productos)
    const filasfiltradas = inventario_productos.filter((row) => {
      return row.nombre.toLowerCase().includes(val.toLowerCase());
      });
      setFiltro(filasfiltradas)
    }
    const cancelsearch = () => {setFiltro(inventario_productos)}

  const edititem=(serial, nombre, cantidad, ubicacion)=>{
    setserialactive(serial)
    setnombreactive(nombre)
    setcantidadactive(cantidad)
    setubicacionactive(ubicacion)
    console.log([serialactive, nombreactive])
    setShowModaledit(true)
  }
  const pluscant=(item) =>{
    const new_data = item
    new_data.cantidad = new_data.cantidad + 1
    EditItem(token, new_data, ()=>{setUpdatte(updatte+1)})
  }
  const minuscant=(item) =>{
    const new_data = item
    new_data.cantidad = new_data.cantidad - 1
    EditItem(token, new_data, ()=>{setUpdatte(updatte+1)})
  }
  const handleremove=(item) =>{

  }
  return (
      <React.Fragment>
          <SearchBar className="busqueda" placeholder="Buscar Material" onChange={(buscado) => handlesearch(buscado)} onCancelSearch={cancelsearch}/>
          <div className="scrollable scrollinvent">
          <div className={"rowdvd rowinvent grayer"} style={{height:"70px"}}>
          <div className="img">Serial</div>
          <div className="material">Articulo</div>
          <div className="cantidad">Cantidad</div>
          </div>
            {datafiltrada &&
            <React.Fragment>{
              datafiltrada.map( (item)=>(

                <React.Fragment  key={ uuidv4()}>
                <div className={"rowdvd rowinvent"} style={{height:"50px"}}>
                    <div className="img">{item.serial}</div>
                    <div className="material">{item.nombre}</div>
                    <div className="cantidad">{item.cantidad}</div>
                        <div className="btns">,
                        <IconButton onClick={()=>edititem(item.serial,item.nombre, item.cantidad, item.ubicacion)} aria-label="edit" size="small" color="primary"><FaEdit /></IconButton>
                        <IconButton onClick={()=>pluscant(item)} aria-label="plus1" size="small"color="primary"><TiPlus /></IconButton>
                        <IconButton onClick={()=>minuscant(item)} aria-label="minus1" size="small" color="primary"><TiMinus /></IconButton>
                        <IconButton onClick={()=>handleremove(item)} aria-label="remove" size="small" color="primary"><FaTrash /></IconButton>
                        </div>
                </div>
            </React.Fragment>

            ))}</React.Fragment>}
          </div>
          <button onClick={()=>setShowModalcreatekit(true)} type="button" className="btntpsr bb">Crear Kit</button>
          <button onClick={()=>setShowModalcreateitem(true)} type="button" className="btntpsr bb creartbtn">Crear Articulo</button>

          <Modaledititem
        showModal={showModaledit}
        hideModal={() => setShowModaledit(false)}
        serial={serialactive}
        nombre={nombreactive}
        cantidad={cantidadactive}
        ubicacion={ubicacionactive}
        forceuptd={() => setUpdatte(updatte + 1)}
      />

        <Modalcreateitem
        showModal={showModalcreateitem}
        hideModal={() => setShowModalcreateitem(false)}
        forceuptd={() => setUpdatte(updatte + 1)}
      />

      <Modalcreatekit
        showModal={showModalcreatekit}
        hideModal={() => setShowModalcreatekit(false)}
        forceuptd={() => setUpdatte(updatte + 1)}
      />
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