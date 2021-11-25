import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { rutaApi} from '../rutas';

// Código adaptado de Nurudeen Amedu (Junio, 2021)
// https://dev.to/theallegrarr/read-csv-files-in-react-apps-without-installing-any-package-hn7

const useStyles = makeStyles({
    botonAgregar: {
        backgroundColor: '#ededed',
        textTransform: 'none',
        color: '#013570',
        margin:'10px auto 10px auto',
        display: 'block'
    }
});

// Función para descargar datos de contraseñas
const DescargarArchivo = ({text, filename, label}) => {
    const data = new Blob([text], { type: 'text/plain' });
    const downloadLink = window.URL.createObjectURL(data)
    return (
        <a download={filename} href={downloadLink}>{label}</a>
    );
}

// Función para agregar usuarios
const postAgregarUsuarios = (data, setContrasenias, token) => {
    const ruta = rutaApi + '/auth/signup';
  
    // Agregar por la Api
    fetch(ruta, {
      method: "POST",
      headers: {
        "token-acceso": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
        if (res.ok) {
            alert("Usuarios ingresados exitosamente.Ya puede descargar el archivo de contraseñas.");
        } else {
            alert("Error al ingresar usuarios.");
        }
        return res.text();
    })
    .then((res) => {
        setContrasenias(res);
        return res;
    })
    .catch((err) => {
      console.log(err);
    });
  };

export default function AgregarUsuariosCSV(){
    const classes = useStyles();
    const token = localStorage.getItem("token");

    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [contrasenias, setContrasenias] = useState('');

    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')-1).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split(/\r\n|\n/);

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })

        // Por simplicidad llamar aquí a la Api
        postAgregarUsuarios(newArray, setContrasenias, token);
        setCsvArray(newArray);
    };

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            processCSV(text)
        }
        reader.readAsText(file);
        setCsvFile('');
    }

    console.log('CSV en formato:', csvArray);

    return(
        <React.Fragment>
            {/* --------------- Obtener usuarios en csv ----------------*/}
            <form id='csv-form'>
                <input
                    type='file'
                    accept='.csv'
                    id='csvFile'
                    onChange={(e) => {
                        setCsvFile(e.target.files[0])
                    }}
                >
                </input>
                <br/>
                <Button variant="contained"
                    className={classes.botonAgregar}
                    onClick={(e) => {
                        e.preventDefault()
                        if(csvFile)submit()
                        // Agregar modal que muestre una tabla con los valores ingresados y ahí se confirme
                    }}
                >
                    Agregar desde archivo
                </Button>
            </form>
            
            <DescargarArchivo 
                text={contrasenias}
                filename={'contrasenias.csv'}
                label={'Descargar contraseñas'}
            />

            <br/>

            <DescargarArchivo
                text={'correo,nombre,apellido1,rol,posicion'}
                filename={'plantillaAgregarUsuarios.csv'}
                label={'Descargar plantilla para agregar usuarios'}
            />

        </React.Fragment>
    );
}