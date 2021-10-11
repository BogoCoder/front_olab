import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmacionBorrado = ({
	showModal,
	hideModal,
	confirmModal,
	message,
}) => {
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
				<Button variant='default' onClick={hideModal}>
					Cancelar
				</Button>
				<Button variant='danger' onClick={() => confirmModal()}>
					Eliminar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmacionBorrado;
