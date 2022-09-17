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
            window.location.href = '/home'
        } catch (error) {
            console.log(error.message)
        }
    }

    render() {
        return (
            <>
                <form>
                    <div className="form-outline mb-4">
                        <input type="text" id="form1Example1" className="form-control" onChange={e => this.setState({ pid: e.target.value })} />
                        <label className="form-label" htmlFor="form1Example1">Please enter PID</label>
                    </div>
                    <button onClick={this.login} className="btn btn-primary btn-block">Sign in</button>
                </form>

            </>
        );
    }
}

export default Employees;