import React from 'react';
import NavSidebar from "./NavSidebar/NavSidebar";
import HeaderOlab from "./HeaderOlab/Header_Olab";

const Tempadminaux = ({content,admin,user}) => {

  return (
    <React.Fragment>
    <NavSidebar admin={admin} />
    {user && <HeaderOlab tipousuario={user.tipo} nombre={user.nombre}/>}
    {!user && <HeaderOlab/>}
    {content}
    </React.Fragment>
  )
}

export default Tempadminaux;