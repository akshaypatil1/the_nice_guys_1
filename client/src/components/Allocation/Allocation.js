import React from 'react';
import * as EmployeesService from '../../services/EmployeesService';
import * as BookingService from '../../services/BookingService';
// import { browserHistory } from 'react-router-dom'
import Header from "../common/Header/Header";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import { Calendar } from 'primereact/calendar';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import Search_icon from "../../assests/Search_icon.png";

import Add from "../../assests/Add.png";
import "../Home/Home.css";
import { Dropdown } from 'primereact/dropdown';
// import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import Create from "../../assests/Create.png";
import Selection_floor_plan_01 from "../../assests/Selection floor plan01.png";
import Selection_floor_plan_02 from "../../assests/Selection floor plan02.png";
import Selection_floor_plan_03 from "../../assests/Selection floor plan03.png";
import Selection_floor_plan_04 from "../../assests/Selection floor plan04.png";
import Selection_floor_plan_05 from "../../assests/Selection floor plan05.png";
// import successfully_done_popup from "../../assests/successfully done popup.png";


class Allocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            startDate: new Date(),
            mouseClick: 0,
            displaySuccessMsg: false,
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

    onImgClick = (mouseClick) => {
        this.setState({ mouseClick })
    }

    fetchEmployees = async () => {
        try {
            let response = await EmployeesService.getEmployees();
            this.setState({ employees: response.data.data });
        } catch (error) {
            console.log(error.message)
        }
    }

    saveBookings = async()=>{
        try {
            let response = await BookingService.bookDesk();
            this.toast.show({severity:'success', summary: 'Success Message', detail:'Seat booked successfully.', life: 3000});
            setTimeout(()=>{ window.location.href = '/home'}, 3000)
        } catch (error) {
            console.log(error.message);
        }        
    }

    render() {
        return (
            <>
                <Header active="Allocation" />
                <Toast ref={(el) => this.toast = el} />
                <div className='container-fluid' style={{ marginLeft: "50px", background: "#E8E8E8" }}>
                    <div className="filterFormDiv col-md-12">
                        <div className='row'>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <label for="usr" style={{ "float": "left" }}>Floor:</label><br />
                                    <Dropdown style={{ width: "100%" }} optionLabel="label" optionValue="value" value={this.state.selectedFloor} options={this.state.floors} onChange={(e) => this.setState({ selectedFloor: e.value })} placeholder="Select a floor" />
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <label for="usr" style={{ "float": "left" }}>Zone:</label><br />
                                    <Dropdown style={{ width: "100%" }} optionLabel="label" optionValue="value" value={this.state.selectedZone} options={this.state.zones} onChange={(e) => this.setState({ selectedZone: e.value })} placeholder="Select a zone" />
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <label for="usr" style={{ "float": "left" }}>From Date:</label><br />
                                    <Calendar style={{ width: "100%" }} value={this.state.startDate} onChange={(e) => this.setState({ startDate: e.value })}></Calendar>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <label for="usr" style={{ "float": "left" }}>To Date:</label><br />
                                    <Calendar style={{ width: "100%" }} value={this.state.toDate} onChange={(e) => this.setState({ toDate: e.value })}></Calendar>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <button
                                        id="floorSearch"
                                        classname="primarySubmitButton btn-primary"
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
                                            marginTop: "22px",
                                            border: "1px solid grey",
                                            width: "100%"
                                        }}
                                    >
                                        {/* <Link to="/Allocation" style={{"text-decoration": "none", "color": "black"}}> */}
                                        Search
                                        <img
                                            className='btnArrowIcon ml-10'
                                            src={Search_icon}
                                            alt="arrowicon"
                                        />
                                        {/* </Link> */}
                                    </button>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <button
                                        id="floorSearch"
                                        onclick={{}}
                                        classname="primarySubmitButton btn-primary"
                                        style={{
                                            color: "white",
                                            background: "black",
                                            border: "none",
                                            fontSize: "18px",
                                            fontFamily: "Credit Suisse Type",
                                            height: "50px",
                                            width: "100%",
                                            marginTop: "22px",
                                            marginRight: "15px",
                                            width: "100%"
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
                        </div>
                    </div>
                    <div className='row' style={{ marginTop: "30px", marginRight: "70px", marginLeft: "30px", marginBottom: "30px" }}>
                        <img
                            className=''
                            src={Create}
                            alt="arrowicon"
                        />
                    </div>
                    <div>
                        <button
                            id=""
                            onClick={e => this.onImgClick(1)}
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
                    <div className='row' style={{ marginTop: "30px", marginRight: "70px", marginLeft: "30px", marginBottom: "30px" }}>
                        {this.state.mouseClick === 1 ?
                            <img
                                className=''
                                src={Selection_floor_plan_01}
                                alt="arrowicon"
                                onClick={e => this.onImgClick(2)}
                            /> : this.state.mouseClick === 2 ?
                                <img
                                    className=''
                                    src={Selection_floor_plan_02}
                                    alt="arrowicon"
                                    onClick={e => this.onImgClick(3)}
                                /> : this.state.mouseClick === 3 ? <img
                                    className=''
                                    src={Selection_floor_plan_03}
                                    alt="arrowicon"
                                    onClick={e => this.onImgClick(4)}
                                /> : this.state.mouseClick === 4 ? <img
                                    className=''
                                    src={Selection_floor_plan_04}
                                    alt="arrowicon"
                                    onClick={e => this.onImgClick(5)}
                                /> : this.state.mouseClick === 5 ? <img
                                    className=''
                                    src={Selection_floor_plan_05}
                                    alt="arrowicon"
                                    onClick={() => this.saveBookings()}
                                /> : ""}

                    </div>
                </div>
                {/* <Dialog visible={this.state.displaySuccessMsg} style={{ width: '20%', height:'250px' }} onHide={() => this.setState({ displaySuccessMsg: false })}>
                    <div style={{textAlign:"center"}}>
                        <i className="pi pi-check" style={{ 'fontSize': '5em', fontW}}></i><br />
                        Successfully Seat Booked
                    </div>

                </Dialog> */}
            </>
        );
    }
}

export default Allocation;