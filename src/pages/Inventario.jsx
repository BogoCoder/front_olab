import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";
import Inventariopage from "../components/InventarioAuxcomps/page"

const contenido = () => {
    return (
        <Inventariopage />
    )
}
const Inventario = ({admin,user}) => {
  return (
    <Tempadminaux content={contenido()} admin={admin} user={user?user:null}/>
  )
}

export default Inventario;