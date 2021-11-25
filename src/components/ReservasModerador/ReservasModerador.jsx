import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';

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
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

// Componentes adicionales
import TablaDetalleReserva from './TablaDetallesReserva';
import ConfirmacionBorrado from './ConfirmacionBorrado';
import ConfirmacionEntrega from './ConfirmacionEntrega';
import { rutaApi } from '../rutas';


// Crear estilos
const useStyles = makeStyles({
  boxTablaReservas: { 
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%', 
    height : '49vh',
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)',
    margin: '0 7% 41% 8%',
    position: 'absolute',
  },
  boxTablaDetalles: {
    backgroundColor: 'white',
    width: '90%', 
    height : '36vh',
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)',
    margin: '52vh 7% 2% 8%',
    position: 'relative',
  },
  boxConteoReservas: {
    backgroundColor: '#4B6B9C', 
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: 'bold',
    width: '25px',
    textAlign: 'center',
    padding: '2px 0',
    borderRadius: '8px',
    float: 'right',
    marginLeft: '5px',
    marginTop: '2px'
  },
  tituloReservas: {
    marginTop:'1%', 
    marginLeft:'2%', 
    color:'#576271', 
    fontSize:'18px', 
    fontFamily:'Open Sans',
    display: 'table',
    padding: '1px 6px',
  },
  tableContainer: {
      maxHeight: '35vh',
      marginTop:'5px',
      marginLeft: '3%',
      maxWidth: '90%',
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
  botonEntrega: {
    backgroundColor: '#1C6EE5',
    color: 'white',
    textTransform: 'none',
    padding: '1px 25% 1px 25%'
  }
});

// Función para obtener todas las reservas realizadas
const getReservas = (setData, token) => {
  const ruta = rutaApi + '/prestamos/estadoReservas';

  // Consultar a la API
  fetch(ruta, {
    method: "GET",
    headers: {
      "token-acceso": token,
    },
  })
  .then((res) => {
    if (res.status===403){
      alert('No tiene los permisos requeridos para esta página.');
      return [];
    } else {
      return res.json();
    }
  })
  .then((res) => {
    setData(res);
    return res;
  })
  .catch((err) => {
    console.log(err);
  });
};

// Función para obtener los productos reservados dado un Id de reserva
const getDetalleReserva = (prestamo_id, setData, token) => {
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

// Función para obtener toda la info, no productos, de una reserva por id
const getInfoReserva = (prestamo_id, data) => {
  try {
    const dataInfo = data.find(e => e.prestamo_id===prestamo_id);
    return dataInfo; 
  } catch (error) {
    console.log('Error getInfo', error.message)
    return {}
  }
};

// Función para eliminar la reserva por la API
const deleteReserva = (prestamo_id, token) => {
  const ruta = rutaApi + '/prestamos/eliminarReserva/' + prestamo_id;

  // Eliminar por la Api
  fetch(ruta, {
    method: "DELETE",
    headers: {
      "token-acceso": token,
    },
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
};

// ------------------------ Componente a exportar ----------------------------
const ReservasModerador = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  // Componentes de estado
  const [dataReservas, setDataReservas] = useState([]);
  const [dataBusqueda, setDataBusqueda] = useState(dataReservas);
  const [idDetalle, setIdDetalle] = useState('');
  const [dataDetalle, setDataDetalle] = useState([]);
  const [numReservas, setNumReservas] = useState(dataReservas.length);
  const [showConfirmacionBorrado, setShowConfirmacionBorrado] = useState(''); // Id reserva a eliminar
  const [showConfirmacionEntrega, setShowConfirmacionEntrega] = useState(''); // Id reserva a entregar

  // Traer datos al iniciar
  useEffect(() => {
    getReservas(setDataReservas, token);
  }, []);

  // Efectos al cambiar estados
  useEffect(() => {
    getReservas(setDataReservas, token);
  }, [numReservas, token]); // En caso de eliminar actualice la tabla
  
  useEffect(()=>{
    setDataBusqueda(dataReservas);
    setNumReservas(dataReservas.length)
  }, [dataReservas])
  
  useEffect(() => {
    try {
      setIdDetalle(dataBusqueda[0].prestamo_id);
    } catch (error) { // En caso de no encontrar coincidencias la busqueda
      setIdDetalle('');
    }
  }, [dataBusqueda])

  useEffect(()=>{
    getDetalleReserva(idDetalle, setDataDetalle, token);
  }, [idDetalle, token])

  // Funciones para la busqueda
  const requestBusqueda = (valor) => {
    const valorBuscado = String(valor);
    const filasFiltradas = dataReservas.filter((row) => {
      return row.nombre.toLowerCase().includes(valorBuscado.toLowerCase());
    });
    setDataBusqueda(filasFiltradas);
  };
  const cancelBusqueda = () => {
    setDataBusqueda(dataReservas);
  };

  // Función para eliminar reserva
  const eliminarReserva = (prestamo_id) => {
    console.log('Eliminar reserva:', prestamo_id)
    deleteReserva(prestamo_id, token);
    setShowConfirmacionBorrado('');  // Guardar modal
    setNumReservas(numReservas - 1);  // Actualizar tabla
  };

  return (
      <React.Fragment>
          <div className={classes.boxTablaReservas}>
            <div className={classes.tituloReservas}>
              Reservas
              <div className={classes.boxConteoReservas}>
                {numReservas}
              </div>
            </div>

            {/* ---------- Confirmación eliminación ------------- */}
            <ConfirmacionBorrado 
              showModal={showConfirmacionBorrado}
              hideModal={() => setShowConfirmacionBorrado('')}
              confirmModal={() => eliminarReserva(showConfirmacionBorrado)}
              message={`¿Está seguro de que desea eliminar la reserva ${showConfirmacionBorrado},
              de ${showConfirmacionBorrado==='' ? 
              '' : dataBusqueda.find((r)=> r.prestamo_id===showConfirmacionBorrado).nombre}?`}
            />
            {/* ---------- Confirmación entrega ----------- */}
            {/* La ruta para conectarse a la Api se llama adentro */}
            <ConfirmacionEntrega
              idReserva={showConfirmacionEntrega}
              hideModal={() => setShowConfirmacionEntrega('')}
              infoReserva={getInfoReserva(showConfirmacionEntrega, dataReservas)}
              setNumReservas = {setNumReservas}
              numReservas = {numReservas}
            />
            
            {/* ------------- Tabla Reservas --------------- */}
            <SearchBar className={classes.boxBusqueda}
              placeholder='Busqueda por nombre'
              onChange={(buscado) => requestBusqueda(buscado)}
              onCancelSearch={() => cancelBusqueda()}
            />
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table stickyHeader className={classes.table} aria-label="tabla-reservas" border={0}>
                <TableHead>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableCell} />
                    <TableCell className={classes.tableCell} align="left">Nombre </TableCell>
                    <TableCell className={classes.tableCell} align="left">Posición </TableCell>
                    <TableCell className={classes.tableCell} align="left">Correo </TableCell>
                    <TableCell className={classes.tableCell} align="left">Fecha Entrega</TableCell>
                    <TableCell className={classes.tableCell} />
                    <TableCell className={classes.tableCell} />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dataBusqueda.map( (row) => (
                    <TableRow key={row.prestamo_id} className={classes.tableRow}
                    style={{backgroundColor: (row.prestamo_id===idDetalle) ? 'rgba(23, 80, 166, .23)':'white'}}>
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
                      <TableCell align='center'className={classes.tableCell}> 
                        <Button variant="contained" disableElevation size='small'
                        className={classes.botonEntrega}
                        onClick={() => setShowConfirmacionEntrega(row.prestamo_id)}> 
                          Entrega 
                        </Button>
                      </TableCell>
                      <TableCell align='center'className={classes.tableCell}> 
                        <IconButton aria-label='Eliminar' size='medium' 
                        onClick={() => setShowConfirmacionBorrado(row.prestamo_id)}>
                          <DeleteIcon style={{fill: 'red'}}/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                  }
                </TableBody>
              </Table>
            </TableContainer>

          </div>

          <div className={classes.boxTablaDetalles}>
            {/* ------------- Tabla Detalle Reservas --------------- */}
            <TablaDetalleReserva productos={dataDetalle}/>
          </div>
      </React.Fragment>
  );
};

export default ReservasModerador;
