import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'react-bootstrap';

import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


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
  tituloAuxiliares: {
    marginTop:'1%', 
    marginLeft:'2%', 
    color:'#576271', 
    fontSize:'18px', 
    fontFamily:'Open Sans',
    display: 'table',
    padding: '1px 6px',
  }
});


// ---------------- Componente a exportar -------------------
const AuxiliaresModerador = () => {
  const classes = useStyles();
  return(
    <React.Fragment>
      <br />
      {/* --------- Tabla auxiliares -------- */}
      <div className={classes.boxTablaAuxiliares}>

      <Row style={{marginTop: '5px'}}>
        <Col md={6}>
          <div className={classes.tituloAuxiliares}>
            Auxiliares del laboratorio
          </div>
        </Col>
        <Col md={{ span: 2, offset: 4 }}>
          <IconButton aria-label="agregarAux"
            onClick={() => { alert('Agregar auxiliar') }}
          >
            <AddCircleOutlineIcon style={{fill: '#1C6EE5', fontSize: 50}}/>
          </IconButton>
        </Col>
      </Row>

      </div>

      {/* --------- Gráfica estadísticas -------- */}
      <Row className={classes.boxEstadisticasHorarios}>

        <Col className={classes.boxInferiores} style={{marginRight: '10px'}}>
          <div className={classes.tituloAuxiliares}>
            Estadísticas
          </div>
        </Col>

        <Col className={classes.boxInferiores} style={{marginLeft: '10px'}}>
          <div className={classes.tituloAuxiliares}>
            Horarios
          </div>
        </Col>

      </Row>
    </React.Fragment>
  );
};

export default AuxiliaresModerador;