import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";
import Politicaspage from "../components/Politicascomps/page";

const contenido = () => {

    return (
      <div >
        <Politicaspage />
      </div>
    )
}
const Politicas = ({content,admin,user}) => {
  return (
    <Tempadminaux content={contenido()} admin={admin} user={user}/>
  )
}
export default Politicas;