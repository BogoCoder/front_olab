import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
import { FaEdit as EditIcon } from "react-icons/fa";

// Importar datos de prueba 
import { dataEstadisticasAux } from './dataPrueba';

// Componente de plotly
const Plot = createPlotlyComponent(Plotly);

const useStyles = makeStyles({
  mensajeInicial: {
    padding: '15% 0',
    textAlign: 'center',
    fontFamily:'Open Sans',
    fontSize:'24px',
  }
});

// Dar formato para gráficar
const formatoGraficas = (rawData) => {
  if (rawData.length === 0 ){ // En caso de consulta vacía
    return rawData;
  }
  // Al llegar datos pasar al formato de plotly
  console.log('RawData', rawData);
  return [
    {
      x: rawData.map((row)=>{return row.dia}),
      y: rawData.map((row)=>{return row.numEntregas}),
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: '#0d3e87'},
      name: 'Entregas'
    },
    {
      x: rawData.map((row)=>{return row.dia}),
      y: rawData.map((row)=>{return row.numDevoluciones}),
      type: 'scatter',
      mode: 'lines+markers',
      marker: {color: '#5c9eff'},
      name: 'Devoluciones'
    }
  ]
};

// Obtener estadísticas de la API
const getEstadisticas = (setData) => {
  const data = formatoGraficas(dataEstadisticasAux);
  setData(data);
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
      <Plot
        graphDiv="series"
        data={dataEstadisticas}
        layout={ {
          xaxis: {
            type: 'date',
            title: {text: 'Día'}
          },
          legend: {
            x: 1.1,
            xanchor: 'right',
            y: 1
          },
          margin: {
            t: 0,
            r: 0,
            l: 20,
            b: 40
          },
        } }
        useResizeHandler={true}
        style={{width: '100%', height: '85%'}}
      />
    </React.Fragment>
  );
};

export default GraficaEstadisticas;