import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";

const contenido = () => {
    return (
        <div>AAAAAAAAAAAAAAAAAAAAAAAAAAqui Va la componente Auxiliares(solo admin)</div>
    )
}
const Auxiliares = ({content}) => {
  return (
    <Tempadminaux content={contenido()} admin="true"/>
  )
}

export default Auxiliares;