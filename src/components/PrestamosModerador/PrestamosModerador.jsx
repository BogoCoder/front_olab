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

// Importar datos de prueba
import {dataPrueba, detallePrueba} from './dataPrueba';

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
  setData(dataPrueba);
};

// Función para obtener los productos prestados dado un ID de prestamo
const getDetallePrestamo = (id_prestamo, setData) => {
  try {
    const dataDetalle = detallePrueba.find(e => e.id_prestamo===id_prestamo).productos 
    setData(dataDetalle);
  } catch (error) {
    console.log('Error getDetalle', error.message) //Al estar vacío no encuentra productos
    return []
  }
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

  // Cargar datos al iniciar
  useEffect(() => {
    getPrestamos(setDataPrestamos);
  }, [])

  // Efectos al cambiar estados
  useEffect(()=>{
    setDataBusqueda(dataPrestamos);
  }, [dataPrestamos])

  useEffect(() => {
    try {
      setIdDetalle(dataBusqueda[0].id_prestamo)
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
                    <TableRow key={row.id_prestamo} className={classes.tableRow}
                    style={{backgroundColor: (row.id_prestamo===idDetalle) ? 'rgba(23, 80, 166, .23)':'white'}}>
                      <TableCell align='center'className={classes.tableCell}> 
                        <IconButton aria-label='Detalles' size='small'
                        onClick={() => setIdDetalle(row.id_prestamo)}>
                          <SearchIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className={classes.tableCell}>
                        {row.nombre}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>{row.posicion}</TableCell>
                      <TableCell align="left" className={classes.tableCell}>{row.correo}</TableCell>
                      <TableCell align="left" className={classes.tableCell}>{row.fecha_entrega}</TableCell>
                      <TableCell align="left" className={classes.tableCell}>{row.fecha_limite_devolucion}</TableCell>
                      <TableCell align="center" className={classes.tableCell}> 
                        {estadoPrestamo(row.fecha_limite_devolucion)}
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
