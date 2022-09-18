import React from "react";
import "./TopBar.css";
import jwt_decode from "jwt-decode";
import User from "../../../assests/User.png";

class TopBar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userName: "",
        }
    }

    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData = async () => {
        try {
            let decoded = jwt_decode(sessionStorage.getItem('token'));
            console.log(decoded)
            this.setState({userName: `${decoded.found.name} (${decoded.found.oeCode})`})
            // this.setState({ floors: response.data.data.floors, zones: response.data.data.zones });
        } catch (error) {
            console.log(error.message)
        }
    }

    render() {
        return (
            <div class="topNav" style={{ height: "60px", borderBottom: "1px solid #d8dbe0",background:"white" }}>

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
                            {this.state.userName}
                        </span>
                    </div>

                    <div className="wrapperleft">
                        <span className="namefont">
                            Login Date:18-09-22
                        </span>
                    </div>
                    {/* <div className="userIcon">
                        <img
                            alt="User Profile"
                            title="User"
                            className="userprofile"
                          src={User}
                        />
                    </div> */}
                  
                </div>

                



            </div>





        );
    }

}


export default TopBar;