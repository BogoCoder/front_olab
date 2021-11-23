import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";
import AuxiliaresModerador from "../components/Auxiliares/AuxiliaresModerador"

const contenido = () => {
    return (
      <React.Fragment>
      <div style={{backgroundColor: '#F7F7F7',  width: '100%', height : '94vh'}}>
        <AuxiliaresModerador />
      </div>
    </React.Fragment>
    )
}
const Auxiliares = ({admin,user}) => {
  return (
    <Tempadminaux content={contenido()} admin={admin} user={user?user:null}/>
  )
}

export default Auxiliares;