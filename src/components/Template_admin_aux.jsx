import React from 'react';
import NavSidebar from "./NavSidebar/NavSidebar";
import HeaderOlab from "./HeaderOlab/Header_Olab";

const Tempadminaux = ({content,admin,tipousuario,nombre}) => {
  return (
    <React.Fragment>
    <NavSidebar admin={admin} />
    <HeaderOlab tipousuario={tipousuario} nombre={nombre}/>
    {content}
    </React.Fragment>
  )
}

export default Tempadminaux;