//import useState hook to create menu collapse state
import React, { useState } from "react";
import {Link} from "react-router-dom"
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { RiShoppingCart2Fill, RiBankLine } from "react-icons/ri";
import { GiReceiveMoney, GiOpenBook } from "react-icons/gi";
import { FaHistory, FaUserAlt } from "react-icons/fa";
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle /*,FiChevronsLeft*/ } from "react-icons/fi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./NavSidebar.css";

import {ReactComponent as OLabLogo} from '../../assets/olab_logo.svg';


const Header = ({admin}) => {

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse} id="menubox" 
          onMouseEnter={()=>{setMenuCollapse(false)}} 
          onMouseLeave={()=>{setMenuCollapse(true)}}
        >
          <SidebarHeader id="headerbox">
            <div className="logotext">
                {/* small and big change using menucollapse state */}
                <p>{menuCollapse ? <OLabLogo /> : <OLabLogo />}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                  {/* changing menu collapse icon on click */}
                {menuCollapse ? (
                  <FiArrowRightCircle/>
                ) : (
                  <FiArrowLeftCircle/>
                )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              
              <MenuItem active={true} icon={<RiShoppingCart2Fill />}><Link to="/Reservas">Reservas</Link></MenuItem>
              <MenuItem icon={<GiReceiveMoney />}><Link to="/Prestamos">Préstamos</Link></MenuItem>
              <MenuItem icon={<FaHistory />}><Link to="/Historial">Historial</Link></MenuItem>
              <MenuItem icon={<GiOpenBook />}><Link to="/Inventario">Inventario</Link></MenuItem>
              {admin ==="true" &&
              <React.Fragment>
                <MenuItem icon={<RiBankLine />}><Link to="/Politicas">Politicas</Link></MenuItem>
                <MenuItem icon={<FaUserAlt />}><Link to="/Auxiliares">Auxiliares</Link></MenuItem>
              </React.Fragment>
              }
            </Menu>
          </SidebarContent>
          
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}> 
                <Link to="/"
                 onClick={() => {localStorage.clear()}}
                >
                  Cerrar sesión
                </Link>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;