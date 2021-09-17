import React from 'react';
import NavSidebar from "./NavSidebar/NavSidebar";
import HeaderOlab from "./HeaderOlab/Header_Olab";

const Tempadminaux = ({content,admin}) => {
  return (
    <React.Fragment>
    <NavSidebar admin={admin} />
    <HeaderOlab tipousuario="Auxiliar" nombre="David Martinez"/>
    {content}
    </React.Fragment>
  )
}

export default Tempadminaux;