import React from "react";
//import "./TopBar.css";

import logo from  "../../../assests/logo.svg";

class TopBar extends React.Component {
   
    render(){
        return(
            <div class="topNav">
            
            <div class="leftwrapper" style={{float:"left",marginLeft: "90px",}}>
                <span className="title" style={{fontSize:"20px",fontFamily:"Credit-Suisse-type"}}>
                    My Cs Space
                </span>
                </div>
            
                <div class="middleWrapper">
               
                </div>
                <div class="rightWrapper rightAlign padRight">
                    <div className="wrapperleft">
                        <span className="namefont">
                         Monalisha Panda(CDQU 21)
                        </span>
                    </div>

                    {/* <div className="wrapperleft">
                        <span className="namefont">
                       Login Date:18-09-22
                        </span>
                    </div> */}
                    </div>

                    <div class="wrapperRight mright-15">
                        <div className="userIcon">
                            <img
                            alt="User Profile"
                            title="User"
                            className="userprofile"
                           // src={userIcon}
                            />
                        </div>
                </div>
            
           
          
              
           </div>
           
        
          
           
      
        );
    }
    
}


export default TopBar;