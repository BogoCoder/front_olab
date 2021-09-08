//import useState hook to create menu collapse state
import React, { useState } from "react";

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
import { HiUserCircle } from "react-icons/hi";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { GiReceiveMoney, GiOpenBook } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./NavSidebar.css";

import {ReactComponent as OLabLogo} from '../../assets/olab_logo.svg';


const Header = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse} id="menubox">
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
              <MenuItem active={true} icon={<HiUserCircle />}>
                Usuario
              </MenuItem>
              <MenuItem icon={<RiShoppingCart2Fill />}>Reservas</MenuItem>
              <MenuItem icon={<GiReceiveMoney />}>Préstamos</MenuItem>
              <MenuItem icon={<FaHistory />}>Historial</MenuItem>
              <MenuItem icon={<GiOpenBook />}>Inventario</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Cerrar sesión</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;