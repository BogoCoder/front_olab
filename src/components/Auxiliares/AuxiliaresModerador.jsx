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

// Componentes adicionales
import ConfirmacionEliminado from './ConfirmacionEliminado';
import ModalEditarAuxiliar from './ModalEditarAuxiliar';
import ModalAgregarAuxiliar from './ModalAgregarAuxiliar';
import GraficaEstadisticas from './GraficaEstadisticas';

// Importar datos de prueba
import {dataPruebaAuxiliares} from './dataPrueba';



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
});

// Función para obtener los auxiliares
const getAuxiliares = (setData) => {
  setData(dataPruebaAuxiliares);
};

// Función para eliminar auxiliar
const eliminarAuxiliar = (id, setDataDel) => {
  //Elimina la fila, debe llamar a la API para eliminar
  console.log('Eliminado el auxiliar:', id)
  setDataDel('');
  // Renderizar de nuevo para que no aparezca la fila
};


// ---------------- Componente a exportar -------------------
const AuxiliaresModerador = () => {
  const classes = useStyles();

  // Estados
  const [dataAuxiliares, setDataAuxiliares] = useState([]);
  const [showConfirmacionEliminar, setshowConfirmacionEliminar] = useState('');
  const [showModalEditar, setShowModalEditar] = useState('');
  const [showModalAgregar, setShowModalAgregar] = useState(false);
  const [showEstadisticas, setShowEstadisticas] = useState('');

  // Cargar datos al iniciar
  useEffect(() => {
    getAuxiliares(setDataAuxiliares);
    console.log('¿Cúantas veces corre esto?')
  }, [])

  // Prueba estados
  console.log('Data auxiliares:', dataAuxiliares );
  console.log('Modal eliminar:', showConfirmacionEliminar);
  console.log('Modal editar:', showModalEditar);
  console.log('Modal agregar:', showModalAgregar);
  console.log('Mostrar estadísticas:', showEstadisticas);

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
                <TableCell className={classes.tableCell} align="left"> Programa </TableCell>
                <TableCell className={classes.tableCell} align="left"> Corte </TableCell>
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
                <TableRow key={row.id} className={classes.tableRow}>
                  <TableCell className={classes.tableCell} align="left"> {row.nombre} </TableCell>
                  <TableCell className={classes.tableCell} align="left"> {row.programa} </TableCell>
                  <TableCell className={classes.tableCell} align="left"> {row.corte} </TableCell>
                  <TableCell className={classes.tableCell} align="left"> {row.correo} </TableCell>
                  <TableCell className={classes.tableCell} align="left"> {row.celular} </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    <IconButton aria-label='boton-estadisticas' size='small'
                      onClick={() => setShowEstadisticas(row.id)}
                    >
                      <LineChartFillIcon style={{fill: '#1750a6', fontSize: 24}}/>
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    <IconButton aria-label='boton-estadisticas' size='small'
                      onClick={() => setShowModalEditar(row.id)}
                    >
                      <EditIcon style={{fill: '#1750a6'}}/>
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    <IconButton aria-label='boton-estadisticas' size='small'
                      onClick={() => setshowConfirmacionEliminar(row.id)}
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
            {showEstadisticas==='' ? '' : ' - ' + dataAuxiliares.find((r) => r.id===showEstadisticas).nombre}
          </div>
          
          <GraficaEstadisticas idAuxiliar={showEstadisticas} />
        </Col>
        
        {/* --------- Tabla con horarios -------- */}
        <Col className={classes.boxInferiores} style={{marginLeft: '10px'}}>
          <div className={classes.titulos}>
            Horarios
          </div>
          Aquí irá una tabla editable con los horarios. No es prioritaria.
        </Col>

      </Row>

      {/* -------------- Modal agregar auxiliar ----------------- */}
      <ModalAgregarAuxiliar
        showModal={showModalAgregar}
        hideModal={() => setShowModalAgregar(false)}
      />

      {/* -------------- Modal confirmación eliminación ------------------ */}
      <ConfirmacionEliminado 
        showModal={showConfirmacionEliminar}
        hideModal={() => setshowConfirmacionEliminar('')}
        confirmModal={() => eliminarAuxiliar(showConfirmacionEliminar, setshowConfirmacionEliminar)}
        message = {`¿Esta seguro que desea eliminar al auxiliar 
          ${ showConfirmacionEliminar==='' ?
            '' : dataAuxiliares.find((r) => r.id===showConfirmacionEliminar).nombre
          } 
          ?`}
      />

      {/* --------------- Modal editar auxiliar ---------------- */}
      <ModalEditarAuxiliar
        showModal={showModalEditar}
        hideModal={() => setShowModalEditar('')}
      />

    </React.Fragment>
  );
};

export default AuxiliaresModerador;