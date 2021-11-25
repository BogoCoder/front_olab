import React from 'react';
import {Scrolluserscomp,Accesibilityconfigscomp} from "./comps";
import "./page.css"

const Politicaspage= () => {
const str1 = "Usuarios con acceso a uso restringido"
const str2 = "Usuarios con acceso a uso confidencial"
    return (
        <React.Fragment>
            <div className="containerpoliticas">
            <div className="divconfigs"><Accesibilityconfigscomp /></div>
            <div className="divrestusers"><Scrolluserscomp title={str1} kind="restringida"/></div>
            <div className="divconfusers"><Scrolluserscomp title={str2} kind="confidencial"/></div>
            </div>
      </React.Fragment>
    )
  }
  export default Politicaspage;