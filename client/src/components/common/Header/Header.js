import React from "react";
import Branding from "./Branding";
import NavigationBar from "./NavigationBar";
 //import ReactNotification from "react-notifications-component";
/** Importing Css*/
 
 //import "react-notifications-component/dist/theme.css";
 import"./Header.css";

 class Header extends React.Component{

    render(){
        return(
            <>
          <Branding/>
          <NavigationBar active={this.props.active}/>
            </>
        );
    }
 }
 export default Header;

