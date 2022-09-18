import React from "react";
import "./Branding.css";

import logoCs from  "../../../assests/logoCs.png";

class Branding extends React.Component {
   
    render(){
        return(
            <div className="branding">
                <span className ="navbar-brand" style={{height:"40px !important"}}>
                    <img
                    className="logoCs"
                    src={logoCs}
                    alt="Credit Suisse Logo"
                    />
                </span>
            </div>
        );
    }
    
}
export default Branding;