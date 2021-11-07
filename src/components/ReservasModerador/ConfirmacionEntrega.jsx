import React, {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';

import TablaDetallesEntrega from "./TablaDetallesEntrega";

// Datos de prueba
import { detallePrueba } from './dataPruebas';

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
});

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

// Función a exportar
const ConfirmacionEntrega = ({
    idReserva,
    hideModal,
    infoReserva,
}) => {
  const classes = useStyles();
  
  const [detalleReserva, setDetalleReserva] = useState([]);

  useEffect(() => {
    getDetalleReserva(idReserva, setDetalleReserva)
  }, [idReserva])

  if (idReserva==='') {
    return(<Modal show={false}></Modal>)
  }

  return(
      <Modal show={true} onHide={hideModal} centered>
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
              <Button className={classes.botones}>
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
      </Modal>
  );
};

export default ConfirmacionEntrega;