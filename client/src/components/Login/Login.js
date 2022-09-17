import React from 'react';
import * as LoginService from '../../services/LoginService'

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
            window.location.href='/home'
        } catch (error) {
            console.log(error.message)
        }
    }

    render() {
        return (
            <>
                <div>Login</div>
                <input onChange={e => this.setState({pid : e.target.value})}></input>
                <button onClick={this.login}>Login</button>
            </>
        );
    }
}

export default Employees;