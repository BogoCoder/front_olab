import React from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	botonCancelar: {
    color: 'white',
    border: 'none',
    background: '#1C6EE5',
    '&:hover': {
      background: '#1252b3',
      boxShadow: 'none',
      textShadow: 'none',
    }
  },
  botonEliminar: {
    color: 'white',
    border: 'none',
    background: '#dc3545',
    '&:hover': {
      background: '#bf2c3a',
      boxShadow: 'none',
      textShadow: 'none',
    }
  }
});

const ConfirmacionBorrado = ({
	showModal,
	hideModal,
	confirmModal,
	message,
}) => {
  const classes = useStyles();

  const show = (showModal==='') ? false:true;
	return (
		<Modal show={show} onHide={hideModal} centered>
			<Modal.Header closeButton>
				<Modal.Title>Confirmación de eliminación</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='alert alert-danger'>{message}</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={hideModal} className={classes.botonCancelar}>
					Cancelar
				</Button>
				<Button onClick={() => confirmModal()} className={classes.botonEliminar}>
					Eliminar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmacionBorrado;
