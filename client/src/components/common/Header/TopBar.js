import React from "react";
import "./TopBar.css";

import logo from  "../../../assests/logo.svg";

class TopBar extends React.Component {
   
    render(){
        return(
            <div className="">
                <span className ="navbar-brand" style={{height:"40px !important"}}>
                    <img
                    className="logoCs"
                   // src={logo}
                    alt="Credit Suisse Logo"
                    />
                </span>
            </div>
        );
    }
    
}
export default TopBar;