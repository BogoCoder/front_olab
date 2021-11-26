import React from 'react';
import sketch from '../assets/sketch.png';

const EnDesarrollo = () => {
    return (
        <div style={{
            backgroundColor: '#F7F7F7',
            width: 'calc(100% - 80px)', height : '94vh',
            marginLeft: '80px', textAlign: 'center',
            display:'flex', flexDirection: 'column', justifyContent: 'center'
          }}
        >
        <h1> Página en desarrollo</h1>
        <img src={sketch} alt="En desarrollo" style={{
            width: '30vh', height : '30vh',
            textAlign: 'center', display: 'block',
            margin: '0 auto'
          }}/>
        
        </div>
    )
}

export default EnDesarrollo;