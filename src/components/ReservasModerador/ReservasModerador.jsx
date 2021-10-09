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

// Tabla detalles
import TablaDetalleReserva from './TablaDetallesReserva';

// Datos de prueba
import { dataPrueba, detallePrueba } from './dataPruebas';


// Crear estilos
const useStyles = makeStyles({
  boxTablaReservas: { // Buscar grid para hacer estos box responsive
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

const getReservas = () => {
  return dataPrueba;
};

const getDetalleReserva = (id_reserva) => {
  const dataDetalle = detallePrueba.find(e => e.id_reserva===id_reserva).productos
  return dataDetalle;
};
// ------------------------ Componente a exportar ----------------------------
const ReservasModerador = () => {
  const classes = useStyles();

  // Componentes de estado
  const [dataReservas, setDataReservas] = useState(getReservas());
  const [dataBusqueda, setDataBusqueda] = useState(dataReservas);
  const [idDetalle, setIdDetalle] = useState(dataBusqueda[0].id_reserva);
  const [numReservas, setNumReservas] = useState(dataReservas.length);

  // Efectos al cambiar estados
  useEffect(() => {
    setDataReservas(getReservas());
  }, [numReservas]); // En caso de eliminar
  
  useEffect(()=>{
    setDataBusqueda(dataReservas);
  }, [dataReservas])
  
  useEffect(() => {
    setIdDetalle(dataBusqueda[0].id_reserva)
  }, [dataBusqueda])

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

  // Pruebas de estados
  //console.log('idDetalle: ',idDetalle)
  return (
      <React.Fragment>
          <div className={classes.boxTablaReservas}>
            <div className={classes.tituloReservas}>
              Reservas
              <div className={classes.boxConteoReservas}>
                {numReservas}
              </div>
            </div>

            <br />
            
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
                    style={{backgroundColor: (row.id_reserva==idDetalle) ? 'rgba(23, 80, 166, .23)':'white'}}>
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
                        onClick={() => { alert('pulsado') }}> 
                          Entrega 
                        </Button>
                      </TableCell>
                      <TableCell align='center'className={classes.tableCell}> 
                        <IconButton aria-label='Eliminar' size='small' 
                        onClick={() => { alert('pulsado') }}>
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
            <TablaDetalleReserva productos={getDetalleReserva(idDetalle)}/>
          </div>
      </React.Fragment>
  );
};

export default ReservasModerador;
