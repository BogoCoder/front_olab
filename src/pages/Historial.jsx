import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";

const contenido = () => {
    return (
        <div style={{
            backgroundColor: '#F7F7F7',
            width: 'calc(100% - 80px)', height : '94vh',
            marginLeft: '80px', textAlign: 'center',
            display:'flex', flexDirection: 'column', justifyContent: 'center'
          }}
        >
          <h1> Página en desarrollo</h1>
        </div>
    )
}
const Historial = ({content,admin}) => {
  return (
    <Tempadminaux content={contenido()} admin={admin}/>
  )
}

export default Historial;