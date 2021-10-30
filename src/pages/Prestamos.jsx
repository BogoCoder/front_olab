import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";
import PrestamosModerador from "../components/PrestamosModerador/PrestamosModerador"

const contenido = () => {
    return (
      <React.Fragment>
        <div style={{backgroundColor: '#F7F7F7',  width: '100%', height : '94vh'}}>
          <br/> {/*Necesario*/}
          <PrestamosModerador />
        </div>
      </React.Fragment>
    )
}
const Prestamos = ({content,admin, user}) => {
  return (
    <Tempadminaux content={contenido()} admin={admin} user={user?user:null}/>
  )
}

export default Prestamos;