import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";

const contenido = () => {
    return (
        <div>AAAAAAAAAAAAAAAAAAAAAAAAAAqui Va la componente Politicas(solo admin)</div>
    )
}
const Politicas = ({content}) => {
  return (
    <Tempadminaux content={contenido()} admin="true"/>
  )
}

export default Politicas;