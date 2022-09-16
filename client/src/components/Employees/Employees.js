import React from 'react';
import * as EmployeesService from '../../services/EmployeesService'

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        this.fetchEmployees()
    }

    fetchEmployees = async () => {
        try {
            let response = await EmployeesService.getEmployees();
            this.setState({ employees: response.data.data });
        } catch (error) {
            console.log(error.message)
        }
    }

    render() {
        return (
            <>
                <div>hello</div>
                <ul>
                    {this.state.employees.map(employee => (
                        <li key={employee.id}>{employee.name}</li>
                    ))}
                </ul>
            </>
        );
    }
}

export default Employees;