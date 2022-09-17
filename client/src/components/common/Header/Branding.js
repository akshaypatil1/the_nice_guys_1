import React from "react";
import "./Branding.css";

import logo from  "../../../assests/logo.svg";

class Branding extends React.Component {
   
    render(){
        return(
            <div className="branding">
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
export default Branding;