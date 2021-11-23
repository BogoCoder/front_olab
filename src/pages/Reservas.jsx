import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";
import ReservasModerador from '../components/ReservasModerador/ReservasModerador';

const contenido = () => {
    return (
      <React.Fragment>
        <div style={{backgroundColor: '#F7F7F7',  width: '100%', height : '94vh'}}>
          <br/> {/*Necesario*/}
          <ReservasModerador />
        </div>
      </React.Fragment>
    )
}
const Reservas = ({admin,user}) => {
  return (
    <Tempadminaux content={contenido()} admin={admin} user={user?user:null}/>
  )
}

export default Reservas;