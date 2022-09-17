import React from 'react';
import * as EmployeesService from '../../services/EmployeesService'
import Header from "../common/Header/Header";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            startDate: new Date(),
        }
        this.options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]
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
            <Header active="Employees"/>
                <div>hello</div>
                <Select options={this.options} />
                <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} />
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