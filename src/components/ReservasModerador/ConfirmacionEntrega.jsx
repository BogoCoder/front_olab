import React, {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';

import TablaDetallesEntrega from "./TablaDetallesEntrega";
import { rutaApi } from '../rutas';

const useStyles = makeStyles({
	botones: {
    height: '42px',
    color: 'white',
    border: 'none',
    background: '#1C6EE5',
    margin: 'auto 10px auto 10px',
    '&:hover': {
      background: '#1252b3',
      boxShadow: 'none',
      textShadow: 'none',
    },
  },
  botonCancelar: {
    color: 'white',
    border: 'none',
    background: '#1C6EE5',
    '&:hover': {
      background: '#1252b3',
      boxShadow: 'none',
      textShadow: 'none',
    }
  }
});

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

// Función para pasar el prestamo a entregado por la Api
const putConfirmarEntrega = (idReserva, token) => {
  const ruta = rutaApi + '/prestamos/confirmarPrestamo/' + idReserva;

  // Modificar el estado del préstamo por la Api
  fetch(ruta, {
    method: "PUT",
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
}

// ------------ Modal a exportar ---------------
const ConfirmacionEntrega = ({
    idReserva,
    hideModal,
    infoReserva,
    setNumReservas, // Se usa para avisar que hay que actualizar la tabla
    numReservas
}) => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  
  const [detalleReserva, setDetalleReserva] = useState([]);

  useEffect(() => {
    getDetalleReserva(idReserva, setDetalleReserva, token)
  }, [idReserva, token])

  if (idReserva==='') {
    return(<Modal show={false}></Modal>)
  }

  return(
      <Modal show={true} onHide={hideModal} centered backdrop="static">
        <Modal.Header closeButton>
				  <Modal.Title>Entrega</Modal.Title>
			  </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              Reserva código {idReserva} <br/>
              {infoReserva.nombre} <br/>
              {infoReserva.posicion} <br/> 
              Tipo de accesibilidad <br/>
              {infoReserva.correo} <br/>
            </div>
            <div className="col-md-3 ml-auto">
              <Button className={classes.botones} 
                onClick={() => {
                  putConfirmarEntrega(idReserva, token);
                  setNumReservas(numReservas - 1);;
                  hideModal();
                }}
              >
                Confirmar
              </Button>
            </div>
            <div className="col-md-3 ml-auto">
              <Button className={classes.botones}>
                Editar
              </Button>
            </div>
          </div>

          {/* ----- Tabla con productos de la reserva ----- */}
          <TablaDetallesEntrega productos={detalleReserva}/>
			  </Modal.Body>

        <Modal.Footer>
          <Button onClick={hideModal} className={classes.botonCancelar}>
            Cancelar
          </Button>
			  </Modal.Footer>
      </Modal>
  );
};

export default ConfirmacionEntrega;