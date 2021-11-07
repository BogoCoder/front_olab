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

// Datos de prueba
import { dataPrueba, detallePrueba } from './dataPruebas';


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
const getReservas = (setData) => {
  setData(dataPrueba);
};

// Función para obtener los productos reservados dado un Id de reserva
const getDetalleReserva = (id_reserva, setData) => {
  try {
    const dataDetalle = detallePrueba.find(e => e.id_reserva===id_reserva).productos 
    setData(dataDetalle);
  } catch (error) {
    console.log('Error getDetalle', error.message) //Al estar vacío no encuentra productos
    return []
  }
};

// Función para obtener toda la info, no productos, de una reserva por id
const getInfoReserva = (id_reserva, data) => {
  try {
    const dataInfo = data.find(e => e.id_reserva===id_reserva);
    return dataInfo; 
  } catch (error) {
    console.log('Error getInfo', error.message)
    return {}
  }
};

// ------------------------ Componente a exportar ----------------------------
const ReservasModerador = () => {
  const classes = useStyles();

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
    getReservas(setDataReservas);
  }, [])

  // Efectos al cambiar estados
  useEffect(() => {
    getReservas(setDataReservas);
  }, [numReservas]); // En caso de eliminar actualice la tabla
  
  useEffect(()=>{
    setDataBusqueda(dataReservas);
  }, [dataReservas])
  
  useEffect(() => {
    try {
      setIdDetalle(dataBusqueda[0].id_reserva);
    } catch (error) { // En caso de no encontrar coincidencias la busqueda
      setIdDetalle('');
    }
  }, [dataBusqueda])

  useEffect(()=>{
    getDetalleReserva(idDetalle, setDataDetalle);
  }, [idDetalle])

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
  const eliminarReserva = (id_reserva) => {
    //Elimina la fila, debe llamar a la API para eliminar
    console.log('Eliminar reserva:', id_reserva)
    setShowConfirmacionBorrado('');
  };

  console.log('Conteo')

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
              '' : dataBusqueda.find((r)=> r.id_reserva===showConfirmacionBorrado).nombre}?`}
            />
            {/* ---------- Confirmación entrega ----------- */}
            <ConfirmacionEntrega
              idReserva={showConfirmacionEntrega}
              hideModal={() => setShowConfirmacionEntrega('')}
              infoReserva={getInfoReserva(showConfirmacionEntrega, dataReservas)}
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
                    <TableCell className={classes.tableCell} align="left">Fecha limite </TableCell>
                    <TableCell className={classes.tableCell} />
                    <TableCell className={classes.tableCell} />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dataBusqueda.map( (row) => (
                    <TableRow key={row.id_reserva} className={classes.tableRow}
                    style={{backgroundColor: (row.id_reserva===idDetalle) ? 'rgba(23, 80, 166, .23)':'white'}}>
                      <TableCell align='center'className={classes.tableCell}> 
                        <IconButton aria-label='Detalles' size='small'
                        onClick={() => setIdDetalle(row.id_reserva)}>
                          <SearchIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className={classes.tableCell}>
                        {row.nombre}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>{row.posicion}</TableCell>
                      <TableCell align="left" className={classes.tableCell}>{row.correo}</TableCell>
                      <TableCell align="left" className={classes.tableCell}>{row.fecha_limite}</TableCell>
                      <TableCell align='center'className={classes.tableCell}> 
                        <Button variant="contained" disableElevation size='small'
                        className={classes.botonEntrega}
                        onClick={() => setShowConfirmacionEntrega(row.id_reserva)}> 
                          Entrega 
                        </Button>
                      </TableCell>
                      <TableCell align='center'className={classes.tableCell}> 
                        <IconButton aria-label='Eliminar' size='medium' 
                        onClick={() => setShowConfirmacionBorrado(row.id_reserva)}>
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
