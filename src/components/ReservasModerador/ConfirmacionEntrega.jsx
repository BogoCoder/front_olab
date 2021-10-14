import React from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	botones: {
    color: 'white',
    border: 'none',
    background: '#1C6EE5',
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

  const show = (idReserva==='') ? false:true;
  // Se debe hacer la revisión si están vacíos
  console.log('InfoReserva:',infoReserva);
  console.log('DetalleReserva:', detalleReserva);

  return(
      <Modal show={show} onHide={hideModal} centered>
        <Modal.Header closeButton>
				  <Modal.Title>Entrega</Modal.Title>
			  </Modal.Header>
        <Modal.Body>
          {idReserva}
          <Button className={classes.botones}>
            Confirmar
          </Button>
          <Button className={classes.botones}>
            Editar
          </Button>
			  </Modal.Body>
      </Modal>
  );
};

export default ConfirmacionEntrega;