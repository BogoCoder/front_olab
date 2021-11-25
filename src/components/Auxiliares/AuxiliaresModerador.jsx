import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'react-bootstrap';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';
import { FaEdit as EditIcon } from "react-icons/fa";
import { RiLineChartFill as LineChartFillIcon} from "react-icons/ri";
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { rutaApi} from '../rutas';

// Componentes adicionales
import ConfirmacionEliminado from './ConfirmacionEliminado';
import ModalEditarAuxiliar from './ModalEditarAuxiliar';
import ModalAgregarAuxiliar from './ModalAgregarAuxiliar';
import GraficaEstadisticas from './GraficaEstadisticas';
import ModalAgregarUsuarios from './ModalAgregarUsuarios';
import AgregarUsuariosCSV from './AgregarUsuariosCSV';


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
    maxHeight: '65%',
    marginTop:'5px',
    marginLeft: '3%',
    maxWidth: '94%',
    "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
      borderRadius: 8,
      border: "1.5px solid #1750A6"
    },
  },
  table: {
    maxWidth: '100%',
  },
  tableRow: {
    height: 40
  },
  tableCell: {
    padding: "0px 16px"
  },
  botonNuevoUsuario: {
    height: '35%',
    width: '75%',
    backgroundColor: '#ededed',
    textTransform: 'none',
    color: '#013570'
  }
});

// Función para obtener los auxiliares
const getAuxiliares = (setData, token) => {
  const ruta = rutaApi + '/usuarios/auxiliares';

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

// Función para eliminar auxiliar
const putEliminarAuxiliar = (id, token) => {
  const ruta = rutaApi + '/usuarios/eliminarAuxiliar';
  const data = { "correo": id };

  // Eliminar por la Api
  fetch(ruta, {
    method: "PUT",
    headers: {
      "token-acceso": token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
};


// ---------------- Componente a exportar -------------------
const AuxiliaresModerador = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  // Estados
  const [dataAuxiliares, setDataAuxiliares] = useState([]);
  const [showConfirmacionEliminar, setshowConfirmacionEliminar] = useState('');
  const [showModalEditar, setShowModalEditar] = useState('');
  const [showModalAgregar, setShowModalAgregar] = useState(false);
  const [showEstadisticas, setShowEstadisticas] = useState('');
  const [forceUpdateCount, setForceUpdateCount] = useState(0);
  const [showAgregarUsuarios, setShowAgregarUsuarios] = useState(false);

  // Cargar datos al iniciar
  useEffect(() => {
    getAuxiliares(setDataAuxiliares, token);
  }, [])

  // Forzar actualización de la tabla
  useEffect(() => {
    getAuxiliares(setDataAuxiliares, token);
  }, [forceUpdateCount, token])

  // Prueba estados
  // console.log('Data auxiliares:', dataAuxiliares );
  // console.log('Modal eliminar:', showConfirmacionEliminar);
  // console.log('Modal editar:', showModalEditar);
  // console.log('Modal agregar:', showModalAgregar);
  // console.log('Mostrar estadísticas:', showEstadisticas);

  return(
    <React.Fragment>
      <br />
      {/* --------- Caja de tabla auxiliares -------- */}
      <div className={classes.boxTablaAuxiliares}>

        <Row style={{marginTop: '5px', marginRight: '3%'}}>
          <Col md={6}>
            <div className={classes.titulos}>
              Auxiliares del laboratorio
            </div>
          </Col>
          <Col md={{ span: 1, offset: 5 }}>
            <IconButton aria-label="agregarAux"
              onClick={() => setShowModalAgregar(true)}
            >
              <AddCircleOutlineIcon style={{fill: '#1C6EE5', fontSize: 50}}/>
            </IconButton>
          </Col>
        </Row>

        {/* ------------ Tabla de auxiliares ----------------*/}
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader className={classes.table} aria-label="tabla-auxiliares" border={0}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCell} align="left"> Nombre </TableCell>
                <TableCell className={classes.tableCell} align="left"> Posición </TableCell>
                <TableCell className={classes.tableCell} align="left"> Correo </TableCell>
                <TableCell className={classes.tableCell} align="left"> Celular </TableCell>
                <TableCell className={classes.tableCell} />
                <TableCell className={classes.tableCell} />
                <TableCell className={classes.tableCell} />
              </TableRow>
            </TableHead>

            <TableBody>
            {
              dataAuxiliares.map( (row) => (
                <TableRow key={row.correo} className={classes.tableRow}>
                  <TableCell className={classes.tableCell} align="left"> {row.nombre} </TableCell>
                  <TableCell className={classes.tableCell} align="left"> {row.posicion} </TableCell>
                  <TableCell className={classes.tableCell} align="left"> {row.correo} </TableCell>
                  <TableCell className={classes.tableCell} align="left"> {row.celular} </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    <IconButton aria-label='boton-estadisticas' size='small'
                      onClick={() => setShowEstadisticas(row.correo)}
                    >
                      <LineChartFillIcon style={{fill: '#1750a6', fontSize: 24}}/>
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    <IconButton aria-label='boton-estadisticas' size='small'
                      onClick={() => setShowModalEditar(row.correo)}
                    >
                      <EditIcon style={{fill: '#1750a6'}}/>
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    <IconButton aria-label='boton-estadisticas' size='small'
                      onClick={() => setshowConfirmacionEliminar(row.correo)}
                    >
                      <ClearIcon style={{fill: 'red'}}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </TableContainer>

      </div>

      <Row className={classes.boxEstadisticasHorarios}>
        
        {/* --------- Gráfica estadísticas -------- */}
        <Col className={classes.boxInferiores} style={{marginRight: '10px'}}>
          <div className={classes.titulos}>
            Estadísticas
            {showEstadisticas==='' ? '' : ' - ' + dataAuxiliares.find((r) => r.correo===showEstadisticas).nombre}
          </div>
          
          <GraficaEstadisticas idAuxiliar={showEstadisticas} />
        </Col>
        
        {/* --------- Ingresar usuarios -------- */}
        <Col className={classes.boxInferiores} style={{marginLeft: '10px'}}>
          <div className={classes.titulos}>
            Agregar usuarios 
          </div>
          <Row className="justify-content-center" style={{padding: '10px'}}>
            <Button variant="contained" 
              className={classes.botonNuevoUsuario}
              onClick={() => setShowAgregarUsuarios(true)}
            >
              <AddCircleIcon style={{fill: '#013570', fontSize: 70}}/>
              Agregar manualmente
            </Button>
          </Row>
          <Row className="justify-content-center" style={{marginTop: '10px'}}>
            <AgregarUsuariosCSV />
          </Row>
        </Col>

      </Row>

      {/* -------------- Modal agregar auxiliar ----------------- */}
      <ModalAgregarAuxiliar
        showModal={showModalAgregar}
        hideModal={() => setShowModalAgregar(false)}
        forzarActualizacion={() => setForceUpdateCount(forceUpdateCount + 1)}
      />

      {/* -------------- Modal confirmación eliminación ------------------ */}
      <ConfirmacionEliminado 
        showModal={showConfirmacionEliminar}
        hideModal={() => setshowConfirmacionEliminar('')}
        confirmModal={() => {
          putEliminarAuxiliar(showConfirmacionEliminar, token);
          setshowConfirmacionEliminar('');
          setForceUpdateCount(forceUpdateCount + 1);
        }}
        message = {`¿Esta seguro que desea eliminar al auxiliar 
          ${ showConfirmacionEliminar==='' ?
            '' : dataAuxiliares.find((r) => r.correo===showConfirmacionEliminar).nombre
          } 
          ?`}
      />

      {/* --------------- Modal editar auxiliar ---------------- */}
      <ModalEditarAuxiliar
        showModal={showModalEditar}
        hideModal={() => setShowModalEditar('')}
      />

      {/* --------------- Modal agregar usuario ----------------- */}
      <ModalAgregarUsuarios 
        showModal={showAgregarUsuarios}
        hideModal={() => setShowAgregarUsuarios(false)}
      />

    </React.Fragment>
  );
};

export default AuxiliaresModerador;