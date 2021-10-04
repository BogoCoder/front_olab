import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";

const contenido = () => {
    return (
        <div>AAAAAAAAAAAAAAAAAAAAAAAAAAqui Va la componente Usuario</div>
    )
}
const Usuario = ({content,admin}) => {
  return (
    <Tempadminaux content={contenido()} admin={admin}/>
  )
}

export default Usuario;