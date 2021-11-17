import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { FaEdit as EditIcon } from "react-icons/fa";

// Importar datos de prueba 
import { dataEstadisticasAux } from './dataPrueba';

const useStyles = makeStyles({
  mensajeInicial: {
    textAlign: 'center',
    fontFamily:'Open Sans',
    fontSize:'24px',
  }
});

// Obtener estadísticas de la API
const getEstadisticas = (setData) => {
  setData(dataEstadisticasAux);
};

// -------------- Componente a exportar ------------------
const GraficaEstadisticas = ({idAuxiliar}) => {
  const classes = useStyles();

  // Estados
  const [dataEstadisticas, setDataEstadisticas] = useState([]);

  // Cargar datos al iniciar
  useEffect(() => {
    getEstadisticas(setDataEstadisticas);
  }, [idAuxiliar])

  // Al iniciar y no seleccionar auxiliar
  if (idAuxiliar==='') {
    return (
      <React.Fragment>
        <div className={classes.mensajeInicial}>
          Seleccione un auxiliar pulsando sobre el icono <br/>
          <EditIcon style={{fill: '#1750a6', marginTop: '10px'}}/>
        </div>
      </React.Fragment>
    )
  };

  // Prueba estados
  console.log('Estadísticas:', dataEstadisticas);

  return(
    <React.Fragment>
      Gráficas del auxiliar {idAuxiliar}
    </React.Fragment>
  );
};

export default GraficaEstadisticas;