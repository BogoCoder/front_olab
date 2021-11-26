import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";
import EnDesarrollo from '../components/EnDesarrollo';

const contenido = () => {
    return (
      <EnDesarrollo />
    )
}
const Historial = ({admin,user}) => {
  return (
    <Tempadminaux content={contenido()} admin={admin} user={user?user:null}/>
  )
}

export default Historial;