import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";
import Inventariopage from "../components/InventarioAuxcomps/page"

const contenido = (inventario,sugerencias) => {
    return (
        <Inventariopage inventario={inventario} sugerencias={sugerencias}/>
    )
}
const Inventario = ({content,admin,inventario, sugerencias,user}) => {
  return (
    <Tempadminaux content={contenido(inventario,sugerencias)} admin={admin} user={user?user:null}/>
  )
}

export default Inventario;