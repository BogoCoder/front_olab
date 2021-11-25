import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { rutaApi} from '../rutas';

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

const putAgregarAuxiliar = (texto, token, setNoEncontrado, cerrarModal) => {
  console.log('Agregar auxiliar con correo:', texto);
  // Se debe agregar un aviso en caso de que no se encuentre el correo ingresado en usuarios
  const ruta = rutaApi + '/usuarios/agregarAuxiliar';
  const data = { "correo": texto };

  // Agregar por la Api
  fetch(ruta, {
    method: "PUT",
    headers: {
      "token-acceso": token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    if (res.status===404) {
      console.log('Usuario no encontrado');
      setNoEncontrado(true);
    } else {
      cerrarModal();
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

const ModalAgregarAuxiliar = ({
  showModal,
  hideModal,
  forzarActualizacion,
}) => {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  // Estado para almacenar correo ingresado
  const [textoCorreo, setTextoCorreo] = useState('');
  const [noEncontrado, setNoEncontrado] = useState(false);

  const handleTextoCorreo = (event) => {
    setTextoCorreo(event.target.value);
  };

  const cerrarModal = () =>{
    hideModal();
    setNoEncontrado(false);
  };

  return (
    <Modal show={showModal} onHide={cerrarModal} centered backdrop="static">
    
      <Modal.Header closeButton>
				<Modal.Title> Agregar auxiliar </Modal.Title>
			</Modal.Header>

      <Modal.Body>
        Indique el correo del usuario a registrar como auxiliar.
          <TextField
            label="Correo del nuevo auxiliar"
            variant="filled"
            style={{width: '90%'}}
            onChange={handleTextoCorreo}
          />
          
          { noEncontrado && 
            <div className='alert alert-danger' style={{marginTop: '30px'}}> 
              Usuario no encontrado. Intente de nuevo.
            </div>
          }
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={cerrarModal} className={classes.botonesFoot}>
          Cancelar
        </Button>
        <Button onClick={() => {
            putAgregarAuxiliar(textoCorreo, token, setNoEncontrado, cerrarModal);
            forzarActualizacion();
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