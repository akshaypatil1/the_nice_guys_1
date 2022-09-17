import React from 'react';
import Header from "../common/header/Header";

class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     employees: []
        // }
    }

    componentDidMount() {
       // this.fetchEmployees()
    }

  render() {
        return (
            <>
            <Header active="Home"/>
                <div>Welcome to Home Page</div>
               
            </>
        );
    }
}

export default Home;