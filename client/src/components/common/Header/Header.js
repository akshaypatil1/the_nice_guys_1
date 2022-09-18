import React from "react";
import Branding from "./Branding";
import NavigationBar from "./NavigationBar";
import TopBar from "./TopBar";
 //import ReactNotification from "react-notifications-component";
/** Importing Css*/
 
 //import "react-notifications-component/dist/theme.css";
 import"./Header.css";

 class Header extends React.Component{

    render(){
        return(
            <>
         <NavigationBar />
          <TopBar />
            </>
        );
    }
 }
 export default Header;

