import React from 'react';
import * as EmployeesService from '../../services/EmployeesService'
import Header from "../common/Header/Header";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import { Calendar } from 'primereact/calendar';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';


class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            startDate: new Date(),
            date1: null,
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
                <Header active="Employees" />
                <div className='container-fluid' style={{ marginLeft: "50px" }}>
                <Calendar value={this.state.date1} onChange={(e) => this.setState({ date1: e.value })}></Calendar>
                <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({ startDate: date })} />
                <Calendar value={this.state.startDate} onChange={(e) => this.setState(e.value)}></Calendar>
                <DropdownMenu position='right' triggerType='icon' trigger='glyphicon glyphicon-option-vertical'>
                    <MenuItem text="View Details" />
                    <MenuItem text="View Attendees" />
                    <MenuItem text="Monthly Details" />
                </DropdownMenu>
                {/* <ul>
                    {this.state.employees.map(employee => (
                        <li key={employee.id}>{employee.name}</li>
                    ))}
                </ul> */}
                </div>
            </>
        );
    }
}

export default Employees;