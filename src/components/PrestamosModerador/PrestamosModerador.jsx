import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'react-bootstrap';

// Dependencias para las tablas
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from "material-ui-search-bar";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// Importar demás componentes
import TablaDetallesPrestamos from './TablaDetallesPrestamo';
import AnuncioEstadoPrestamo from './AnuncioEstadoPrestamo';
import ModalNuevoPrestamo from './ModalNuevoPrestamo';
import ModalDevolucion from './ModalDevolucion';
import { rutaApi } from '../rutas';

// Importar datos de prueba
import {dataPrueba, detallePrueba} from './dataPrueba';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJnZXJtYW5vYmFuZG9AdXJvc2FyaW8uZWR1LmNvIiwiaWF0IjoxNjM3NTg5NjU5LCJleHAiOjE2Mzc2NzYwNTl9.SY-_OYofX0xpMmzuXO1vq3BQUVJikHv5UcUUjGcgiPk';

// Crear estilos
const useStyles = makeStyles({
  boxTablaPrestamos: { 
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%', 
    height : '49vh',
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)',
    margin: '0 7% 41% 8%',
    position: 'absolute',
  },
  boxInfoPrestamo: {
    backgroundColor: 'white',
    width: '90%', 
    height : '36vh',
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)',
    margin: '52vh 7% 2% 8%',
    position: 'relative',
  },
  tituloPrestamos: {
    marginTop:'1%', 
    marginLeft:'2%', 
    color:'#576271', 
    fontSize:'18px', 
    fontFamily:'Open Sans',
    display: 'table',
    padding: '1px 6px',
  },
  tituloPrestamoDetalle: {
    marginTop:'0', 
    marginLeft:'2%', 
    color:'#576271', 
    fontSize:'18px', 
    fontFamily:'Open Sans',
    padding: '10px 6px',
  },
  tableContainer: {
    maxHeight: '35vh',
    marginTop:'5px',
    marginLeft: '3%',
    maxWidth: '97%',
    "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
      borderRadius: 8,
      border: "1.5px solid #1750A6"
    },
  },
  table: {
    maxWidth: '100%',
  },
  boxBusqueda: {
    width: '40%',
    height: '32px',
    marginTop:'10px',
    marginLeft: '5%'
  },
  tableRow: {
    height: 40
  },
  tableCell: {
    padding: "0px 16px"
  },
  botonDevolucion: {
    backgroundColor: '#1C6EE5',
    color: 'white',
    padding: '1px 25% 1px 25%',
    height: '40px',
    width: '75%',
    fontWeight: 'bold'
  },
  botonNuevoPrestamo: {
    height: '120px',
    width: '75%',
    backgroundColor: '#ededed',
    textTransform: 'none',
    color: '#013570'
  }
});

// Función para definir el estado del prestamo
const estadoPrestamo = (fecha_limite_devolucion) => {
  const diaHoy = new Date()
  const fechaDev = new Date(fecha_limite_devolucion)
  const diasDiff = Math.floor((fechaDev - diaHoy)/(1000*60*60*24))
  if (diasDiff < 0){
    return(
      <React.Fragment>
        <ErrorIcon style={{fill: 'red'}} />
      </React.Fragment>
    );
  } else if (diasDiff <= 1){
    return(
      <React.Fragment>
        <WarningIcon style={{fill: 'orange'}} />
      </React.Fragment>
    );
  } else {
    return(
      <React.Fragment>
        <CheckCircleIcon style={{fill: 'green'}} />  
      </React.Fragment>
    );
  }
};

// Función para obtener todos los prestamos activos
const getPrestamos = (setData) => {
  const ruta = rutaApi + '/prestamos/estadoPrestamos';

  // Consultar a la API
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
    setData(res);
    return res;
  })
  .catch((err) => {
    console.log(err);
  });
};

// Función para obtener los productos prestados dado un ID de prestamo
const getDetallePrestamo = (prestamo_id, setData) => {
  if (prestamo_id==='') {
    setData([]);
    return []
  }
  const ruta = rutaApi + '/prestamos/reservaxid/' + prestamo_id;

  // Consultar a la API
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
    setData(res);
    return res;
  })
  .catch((err) => {
    console.log(err);
  });
};


// -------------------------------------------
// ---------- Componente a exportar ----------
const PrestamosModerador = () => {
  const classes = useStyles();

  // Componentes de estado
  const [dataPrestamos, setDataPrestamos] = useState([]);
  const [dataBusqueda, setDataBusqueda] = useState(dataPrestamos);
  const [idDetalle, setIdDetalle] = useState('');
  const [dataDetalle, setdataDetalle] = useState([]);
  const [showDevolucion, setShowDevolucion] = useState(false);
  const [showNuevoPrestamo, setShowNuevoPrestamo] = useState(false);
  const [forceUpdateCount, setForceUpdateCount] = useState(0) 

  // Cargar datos al iniciar
  useEffect(() => {
    getPrestamos(setDataPrestamos);
  }, [])

  useEffect(() => {
    getPrestamos(setDataPrestamos);
  }, [forceUpdateCount]) // Actualizar tabla al devolver préstamo.

  // Efectos al cambiar estados
  useEffect(()=>{
    setDataBusqueda(dataPrestamos);
  }, [dataPrestamos])

  useEffect(() => {
    try {
      setIdDetalle(dataBusqueda[0].prestamo_id)
    } catch (error) { // En caso de no encontrar coincidencias la busqueda
      setIdDetalle('')
    }
  }, [dataBusqueda])

  useEffect(() => {
    getDetallePrestamo(idDetalle, setdataDetalle);
  }, [idDetalle])

  // Funciones para la busqueda
  const requestBusqueda = (valor) => {
    const valorBuscado = String(valor);
    const filasFiltradas = dataPrestamos.filter((row) => {
      return row.nombre.toLowerCase().includes(valorBuscado.toLowerCase());
    });
    setDataBusqueda(filasFiltradas);
  };
  const cancelBusqueda = () => {
    setDataBusqueda(dataPrestamos);
  };

  // Función para actualizar tabla al devolver préstamo
  const forzarActualizacion = () =>{
    setIdDetalle('');
    setForceUpdateCount(forceUpdateCount + 1)
  };

  return(
    <React.Fragment>
      <div className={classes.boxTablaPrestamos}>
        <div className={classes.tituloPrestamos}>
          Préstamos activos
        </div>

        {/* ---------- Tabla de prestamos activos ---------- */}
        <SearchBar className={classes.boxBusqueda}
          placeholder='Busqueda por nombre'
          onChange={(buscado) => requestBusqueda(buscado)}
          onCancelSearch={() => cancelBusqueda()}
        />
        <Row>
          <Col>
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table stickyHeader className={classes.table} aria-label="tabla-prestamos" border={0}>
                <TableHead>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableCell} />
                    <TableCell className={classes.tableCell} align="left">Nombre </TableCell>
                    <TableCell className={classes.tableCell} align="left">Posición </TableCell>
                    <TableCell className={classes.tableCell} align="left">Correo </TableCell>
                    <TableCell className={classes.tableCell} align="left">Fecha entrega </TableCell>
                    <TableCell className={classes.tableCell} align="left">Fecha límite devolución </TableCell>
                    <TableCell className={classes.tableCell} align="left">Estado </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dataBusqueda.map( (row) => (
                    <TableRow key={row.prestamo_id} className={classes.tableRow}
                      style={{backgroundColor: (row.prestamo_id===idDetalle) ? 'rgba(23, 80, 166, .23)':'white'}}
                    >
                      <TableCell align='center'className={classes.tableCell}> 
                        <IconButton aria-label='Detalles' size='small'
                        onClick={() => setIdDetalle(row.prestamo_id)}>
                          <SearchIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className={classes.tableCell}>
                        {row.nombre}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>{row.posicion}</TableCell>
                      <TableCell align="left" className={classes.tableCell}>{row.correo}</TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {row.entrega.substring(0,10) + ' '+ row.entrega.substring(11,16)}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {row.devolucion.substring(0,10) + ' '+ row.devolucion.substring(11,16)}
                      </TableCell>
                      <TableCell align="center" className={classes.tableCell}> 
                        {estadoPrestamo(row.devolucion)}
                      </TableCell>
                    </TableRow>
                  ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Col>  

          <Col xs={3} style={{margin: '0 3% 0 1.5%'}}>
            <Row className="justify-content-center">
              <Button variant="contained" 
                className={classes.botonNuevoPrestamo}
                onClick={() => { setShowNuevoPrestamo(true) }}
              >
                <AddCircleIcon style={{fill: '#013570', fontSize: 70}}/>
                Agregar préstamo sin reserva
              </Button>
            </Row>
            <Row className="justify-content-center" style={{marginTop:'15%'}}>
              <Button variant="contained" 
                className={classes.botonDevolucion}
                onClick={() => { setShowDevolucion(true)}}
              >
                Devolución
              </Button>
            </Row>
          </Col>
        </Row>
      </div>

      <div className={classes.boxInfoPrestamo}>
        <Row>
          <Col>
            <div className={classes.tituloPrestamoDetalle}>
              Préstamo {idDetalle}
            </div>
            {/* ---------- Tabla detalle prestamo ---------- */}
            <TablaDetallesPrestamos productos={dataDetalle} />
          </Col>
          <Col xs={3} style={{margin: '2% 3% 2% 0'}}>
            <AnuncioEstadoPrestamo idDetalle={idDetalle} dataPrestamos={dataPrestamos}/>
          </Col>
        </Row>
      </div>

      {/* ---------- Modal devolución prestamo ----------*/}
      <ModalDevolucion
        showModal={showDevolucion}
        hideModal={() => setShowDevolucion(false)}
        idPrestamo={idDetalle}
        productos={dataDetalle}
        onConfirmDevolucion = { () => forzarActualizacion()}
      />

      {/* ---------- Modal nuevo prestamo sin reserva ----------*/}
      <ModalNuevoPrestamo 
        showModal={showNuevoPrestamo}
        hideModal={() => setShowNuevoPrestamo(false)}
      />

    </React.Fragment>
  );
};

export default PrestamosModerador;
