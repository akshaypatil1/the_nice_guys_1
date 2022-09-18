import React from "react";
import "./TopBar.css";

import User from "../../../assests/User.png";

class TopBar extends React.Component {

    render() {
        return (
            <div class="topNav" style={{ height: "60px", borderBottom: "1px solid #d8dbe0" }}>

                <div class="leftwrapper" style={{ float: "left", marginLeft: "90px", }}>
                    <span className="title" style={{ fontSize: "30px", fontFamily: "inherit" }}>
                        My CS Space
                    </span>
                </div>

                <div class="middleWrapper">

                </div>
                <div class="rightWrapper rightAlign padRight row">
                    <div className="wrapperleft">
                        <span className="namefont">
                            Monalisha Panda(CDQU 21)
                        </span>
                    </div>

                    <div className="wrapperleft">
                        <span className="namefont">
                            Login Date:18-09-22
                        </span>
                    </div>
                    <div className="userIcon">
                        <img
                            alt="User Profile"
                            title="User"
                            className="userprofile"
                          src={User}
                        />
                    </div>
                  
                </div>

                



            </div>





        );
    }

}


export default TopBar;