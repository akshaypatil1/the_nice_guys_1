import React from 'react';
import * as EmployeesService from '../../services/EmployeesService'
import Header from "../common/Header/Header";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import { Calendar } from 'primereact/calendar';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import Search_icon from "../../assests/Search_icon.png";

import Add from "../../assests/Add.png";
import "../Home/Home.css";

import Create from "../../assests/Create.png";
import Floorplan from "../../assests/floorplan.png";

class Allocation extends React.Component {
   
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
                <Header active="Employees" />
                <div className='container-fluid' style={{ marginLeft: "50px", background: "#E8E8E8" }}>
                    <div className="filterFormDiv col-md-12">
                        <div className="filterContainer" style={{ marginLeft: "30px", textAlign: "justify" }}>
                            <div className="inlineDisplay lign mr-30  wid-200">
                                <label className='heading-label'>
                                    Floor
                                </label>
                                <br></br>
                                <Select options={this.state.floors} isSearchable={true} onChange={e => this.setState({ selectedFloor: e.value })} />
                            </div>
                            <div className="inlineDisplay vertiAlign mr-15  wid-200">
                                <label className='heading-label'>
                                    Zone
                                </label>
                                <br></br>
                                <Select options={this.state.zones} isSearchable={true} onChange={e => this.setState({ selectedZone: e.value })} />
                            </div>
                            <div className="inlineDisplay vertiAlign mr-15  wid-200" style={{ verticalAlign: "top" }}>
                                <label className='heading-label filterLabe'>
                                    From Date
                                </label>
                                <br></br>
                                <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({ startDate: date })} />
                            </div>
                            <div className="inlineDisplay vertiAlign mr-15  wid-200" style={{ verticalAlign: "top" }}>
                                <label className='heading-label'>
                                    TO Date
                                </label>
                                <br></br>
                                <DatePicker selected={this.state.toDate} onChange={(date) => this.setState({ toDate: date })} />

                            </div>
                        </div>
                        <div className="inlineDisplay verMiddle right-align-run col-md-3" style={{ verticalAlign: "top" }}>
                            <button
                                id="floorSearch"
                                onclick={{}}
                                classname="primarySubmitButton btn-primary wid-150"
                                style={{
                                    color: "black",
                                    background: "white",
                                    border: "none",
                                    fontSize: "18px",
                                    fontFamily: "Credit Suisse Type",
                                    height: "50px",
                                    width: "150px",
                                    marginRight: "20px",
                                    padding: "10px",
                                    marginTop: "20px",
                                    border: "1px solid grey"
                                }}
                            >
                                Search

                                <img
                                    className='btnArrowIcon ml-10'
                                    src={Search_icon}
                                    alt="arrowicon"
                                />
                            </button>

                            <button
                                id="floorSearch"
                                onclick={{}}
                                classname="primarySubmitButton btn-primary wid-150 mr-30"
                                style={{
                                    color: "white",
                                    background: "black",
                                    border: "none",
                                    fontSize: "18px",
                                    fontFamily: "Credit Suisse Type",
                                    height: "50px",
                                    width: "250px",
                                    marginRight: "20px",
                                    padding: "10px",
                                    marginTop: "20px",
                                }}
                            >
                                <img
                                    className='btnArrowIcon mr-10'
                                    src={Add}
                                    alt="arrowicon"
                                />
                                Create Desk Allocation


                            </button>
                        </div>
                    </div>
                    <div className='row' style={{marginTop:"30px",marginRight:"70px",marginLeft:"30px",marginBottom: "30px" }}>
                        <img
                            className=''
                            src={Create}
                            alt="arrowicon"
                        />
                    </div>
                    <button
                                id="floorSearch"
                                onclick={{}}
                                classname="primarySubmitButton btn-primary wid-150 mr-30"
                                style={{
                                    color: "white",
                                    background: "black",
                                    border: "none",
                                    fontSize: "20px",
                                    fontFamily: "Credit Suisse Type",
                                    height: "50px",
                                    width: "250px",
                                    marginLeft: "20px",
                                    padding: "10px",
                                    marginTop: "20px",
                                }}
                            >   
                                Get Floor Plan
                            </button>

                </div>

                <div className='row' style={{marginTop:"30px",marginRight:"70px",marginLeft:"30px",marginBottom: "30px" }}>
                        <img
                            className=''
                            src={Floorplan}
                            alt="arrowicon"
                        />
                    </div>
            </>
        );
    }
}

export default Allocation;