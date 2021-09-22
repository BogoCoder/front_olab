import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';

// Crear estilos
const useStyles = makeStyles({
  boxTablaReservas: { // Buscar grid para hacer estos box responsive
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '80%', 
    height : '50vh',
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)',
    margin: '5vh 7% 41% 18%',
    position: 'absolute',
  },
  boxTablaDetalles: {
    backgroundColor: 'white',
    width: '80%', 
    height : '35vh',
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)',
    margin: '58vh 7% 3% 18%',
    position: 'relative',
  },
  boxConteoReservas: {
    backgroundColor: '#4B6B9C', 
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: 'bold',
    width: '25px',
    textAlign: 'center',
    padding: '2px 0',
    borderRadius: '8px',
    float: 'right',
    marginLeft: '5px',
    marginTop: '2px'
  },
  tituloReservas: {
    marginTop:'1%', 
    marginLeft:'2%', 
    color:'#576271', 
    fontSize:'18px', 
    fontFamily:'Open Sans',
    display: 'table',
    padding: '1px 6px',
  }
});

const getDatosPrueba = () => {
  const dataPrueba = [{
    'nombre': 'Andrés Salazar',
    'posicion': 'Estudiante',
    'correo': 'and.sal@urosario.edu.co',
    'fecha_limite': '2021-08-20 13:00'
  },
  {
    'nombre': 'Camilo Martínez',
    'posicion': 'Estudiante',
    'correo': 'cam.mar@urosario.edu.co',
    'fecha_limite': '2021-08-20 14:35'
  }];
  return dataPrueba;
};

const ReservasModerador = () => {
  const classes = useStyles();

  // Componentes de estado
  const [numReservas, setNumReservas] = useState(0);
  const [dataReservas, setDataReservas] = useState([]);

  // Se requerirá un handle para restar el número de reservas
  useEffect(() => {
    // Aquí ira el fetch para traer los datos generales de las reservas realizadas
    setDataReservas(getDatosPrueba());
  }, [numReservas]);

  console.log(dataReservas);
  
  return (
      <React.Fragment>
          <div className={classes.boxTablaReservas}>
            <div className={classes.tituloReservas}>
              Reservas
              <div className={classes.boxConteoReservas}>
                {numReservas}
              </div>
            </div>
          </div>

          <div className={classes.boxTablaDetalles}>
            <p className="aligncenter"> Tabla detalles</p>
          </div>
      </React.Fragment>
  );
};

export default ReservasModerador
