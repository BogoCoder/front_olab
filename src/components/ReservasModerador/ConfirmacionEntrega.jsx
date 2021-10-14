import React from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';

import TablaDetallesEntrega from "./TablaDetallesEntrega";

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


const ConfirmacionEntrega = ({
    idReserva,
    hideModal,
    infoReserva,
    detalleReserva,
}) => {
  const classes = useStyles();
  console.log('DetalleEntrega:', detalleReserva)
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