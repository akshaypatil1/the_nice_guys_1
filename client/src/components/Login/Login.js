import React from 'react';
import * as LoginService from '../../services/LoginService'
// import login_img from "../../assests/login_img.png";
// import login_' from "../../"
import login_img from "../../assests/login _img.png";
import Asset from "../../assests/Asset.png";
import "./Login.css";



class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: ""
        }
    }

    login = async () => {
        try {
            let response = await LoginService.login(this.state.pid);
            sessionStorage.setItem("token", response.data.data);
            window.location.href = '/home'
        } catch (error) {
            console.log(error.message)
        }
    }

    render() {
        return (
            <>
                {/* <form>
                    <div className="form-outline mb-4">
                        <input type="text" id="form1Example1" className="form-control" onChange={e => this.setState({ pid: e.target.value })} />
                        <label className="form-label" htmlFor="form1Example1">Please enter PID</label>
                    </div>
                    <button onClick={this.login} className="btn btn-primary btn-block">Sign in</button>
                </form> */}

                <section className="vh-100">
                    <div className="container-fluid h-custom vh-100">
                        <div className="branding">
                            <span className="navbar-brand" style={{ height: "40px !important" }}>
                                <img
                                    className="logoCs"
                                    src={Asset}
                                    alt="Credit Suisse Logo"
                                />
                            </span>
                        </div>

                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <h1><span style={{ fontSize: "25px" }}>Welcome to</span>
                                    <br>
                                    </br>
                                    My CS WorkSpace
                                </h1>
                                <img src={login_img} />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <form>

                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label labelfont">UserName<span>*</span></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control form-control-lg" id="inputEmail3" placeholder="UserName" />
                                        </div>
                                    </div>
                                    <div class="form-group row mt-20">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label labelfont">MPID:</label>
                                        <div class="col-sm-10">
                                            <input type="text" id="form3Example3" className="form-control form-control-lg"
                                                placeholder="Enter a valid PID" onChange={e => this.setState({ pid: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="text-center text-lg-start mt-40 pt-2">
                                        <button type="button" className="btn btn btn-dark btn-lg" onClick={this.login}
                                            style={{ "padding-left": "2.5rem", "padding-right": "2.5rem" }}>Login</button>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                </section>

            </>
        );
    }
}

export default Employees;