import React from 'react';
import {ReactComponent as OLabLogo} from '../../assets/olab_logo.svg';

const HeaderOlab = () => {
  return (
    <React.Fragment>
      <p className="aligncenter">
      <OLabLogo/>
      </p>
    </React.Fragment>
  )
}

export default HeaderOlab;