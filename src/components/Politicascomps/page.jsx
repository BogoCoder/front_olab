import React from 'react';
import {Scrolluserscomp,Accesibilityconfigscomp} from "./comps";
import "./page.css"

const Politicaspage= ({accesibilityconfigs,restrictedusers,condidenceusers}) => {
const str1 = "Usuarios con acceso a uso restringido"
const str2 = "Usuarios con acceso a uso confidencial"
    return (
        <React.Fragment>
            <div className="containerpoliticas">
            <div className="divconfigs"><Accesibilityconfigscomp content={accesibilityconfigs}/></div>
            <div className="divrestusers"><Scrolluserscomp title={str1} content={restrictedusers}/></div>
            <div className="divconfusers"><Scrolluserscomp title={str2} content={condidenceusers}/></div>
            </div>
      </React.Fragment>
    )
  }
  export default Politicaspage;