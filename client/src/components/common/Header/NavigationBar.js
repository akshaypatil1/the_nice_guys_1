//import useState hook to create menu collapse state
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import CSsymbol from "../../../assests/CSsymbol.png";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./NavigationBar.css";

class NavigationBar extends React.Component {

  render() {
    return (
      <>
        <div id="navigationBar">
          {/* collapsed props to change menu size using menucollapse state */}
          <ProSidebar>
            <SidebarHeader>
              <div className="logotext" style={{height:"40px", margin:"10px"}}>
                {/* small and big change using menucollapse state */}
                <img
                  className="logoCs"
                 src={CSsymbol}
                  alt="Credit Suisse Logo"
                />
              </div>

            </SidebarHeader>
            <SidebarContent>
            
                <NavLink
                  // excat
                  activeclassName="navbar_link_active" 
                  className="mt-20 mb-20"
                  to="/Home"
                >
                 <MenuItem icon={<FiHome />}></MenuItem> 

                </NavLink>
                <NavLink
                 // excat
                 activeclassName="navbar_link_active" 
                 className="mt-20 mb-20"
                  to="/Employees"
>
                  <MenuItem icon={<FaList />}></MenuItem>
                
               
                </NavLink>
             
            </SidebarContent>
            <SidebarFooter>

            </SidebarFooter>
          </ProSidebar>
        </div>
      </>
    );
  }
}

export default NavigationBar;