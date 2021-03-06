import React from 'react'
import { Row } from 'react-bootstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';

const diasDiffDevolucion = (id, data) => {
  const fechaLimDev = data.find(e => e.prestamo_id===id).devolucion 
  const diaHoy = new Date()
  const fechaDev = new Date(fechaLimDev)
  const diasDiff = Math.floor((fechaDev - diaHoy)/(1000*60*60*24))
  return diasDiff;
};

const iconoEstado = (diasDiff) => {
  const size = '24vh';
  if (diasDiff < 0){
    return(
      <React.Fragment>
        <ErrorIcon style={{fill: 'red', fontSize: size}} />
      </React.Fragment>
    );
  } else if (diasDiff <= 1){
    return(
      <React.Fragment>
        <WarningIcon style={{fill: 'orange', fontSize: size}} />
      </React.Fragment>
    );
  } else {
    return(
      <React.Fragment>
        <CheckCircleIcon style={{fill: 'green', fontSize: size}} />  
      </React.Fragment>
    );
  }
};

const mensajeEstado = (diasDiff) => {
  let mensaje;
  if (diasDiff < 0){
    mensaje = `¡ Retrasado ${-diasDiff} día${(-diasDiff===1) ? '':'s'} !`;
  } else if (diasDiff <= 1){
    mensaje = '! Pronto a vencerse !';
  } else {
    mensaje = `Se vence en ${diasDiff} días`
  }
  return mensaje;
};

export default function AnuncioEstadoPrestamo ({idDetalle, dataPrestamos}){
  // En caso de consolta sin resultados
  if(idDetalle===''){
    return(
      <React.Fragment>
        Seleccione un préstamo.
      </React.Fragment>
    );
  }

  // Si se encuentran resultados continúá
  const diasDiff = diasDiffDevolucion(idDetalle, dataPrestamos)
  
  return(
    <React.Fragment>
      <Row className="justify-content-center" style={{fontWeight: 'bold'}}> Estado </Row>
      <Row className="justify-content-center">
        {iconoEstado(diasDiff)}
      </Row>
      <Row className="justify-content-center">
        {mensajeEstado(diasDiff)}
      </Row>
    </React.Fragment>
  );
};