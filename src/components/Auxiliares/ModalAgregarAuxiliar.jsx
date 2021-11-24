import React from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import { rutaApi, token } from '../rutas';

const useStyles = makeStyles({
	botonesFoot: {
    color: 'white',
    border: 'none',
    background: '#1C6EE5',
    '&:hover': {
      background: '#1252b3',
      boxShadow: 'none',
      textShadow: 'none',
    }
  },
});

const putAgregarAuxiliar = () => {
  console.log('Agregar auxiliar aquí');
  // Se debe agregar un aviso en caso de que no se encuentre el correo ingresado en usuarios
  /*
  const ruta = rutaApi + '/usuarios/agregarAuxiliar';
  const data = { "correo": texto };

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
  */
};

const ModalAgregarAuxiliar = ({
  showModal,
  hideModal,
  forzarActualizacion,
}) => {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  return (
    <Modal show={showModal} onHide={hideModal} centered backdrop="static">
    
      <Modal.Header closeButton>
				<Modal.Title> Agregar auxiliar </Modal.Title>
			</Modal.Header>

      <Modal.Body>
        Indique el correo del usuario a registrar como auxiliar.
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={hideModal} className={classes.botonesFoot}>
          Cancelar
        </Button>
        <Button onClick={() => {
            putAgregarAuxiliar();
            forzarActualizacion();
            hideModal();
          }} 
          className={classes.botonesFoot}
        >
          Agregar
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default ModalAgregarAuxiliar;