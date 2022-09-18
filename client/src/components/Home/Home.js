import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Header from "../common/Header/Header";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import "./Home.css";
import * as HomeService from '../../services/HomeService'
import jwt_decode from "jwt-decode";
import floorplan from "../../assests/floorplan.png";
import cakeIcon from "../../assests/Cake icon.png";
import Search_icon from "../../assests/Search_icon.png";
import medalIcon from "../../assests/medal.png";
import less from "../../assests/less.png";
import greater from "../../assests/greater.png";
import Add from "../../assests/Add.png";
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import seat_Available from "../../assests/seat_Available.png";
import BG from "../../assests/BG.png";
import book_seat from "../../assests/book_seat.png";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            startDate: new Date(),
            toDate: new Date(),
            floors: [],
            selectedFloor: null,
            zones: [],
            selectedZone: null,
            floorStats: [],
            bookingDetails: [],
            currentFloorIndex: 0,
            floorWiseBookings: [],
            date1: null,
        }
    }

    componentDidMount() {
        this.fetchFilters();
        this.fetchBookingData();
    }

    fetchFilters = async () => {
        try {
            let response = await HomeService.getFilters();
            this.setState({ floors: response.data.data.floors, zones: response.data.data.zones });
        } catch (error) {
            console.log(error.message)
        }
    }

    fetchBookingData = async () => {
        try {
            let requestData = {
                pid: 1000,
                date: "18/09/2022",
                roleId: 'DIR'
            }
            let decoded = jwt_decode(sessionStorage.getItem('token'));
            requestData.roleId = decoded.found.roleId;
            if (decoded.found.roleId === 'EMP') {
                requestData.pid = decoded.found.managersPid
            }
            let response = await HomeService.fetchBookingData(requestData);
            let floorWiseBookings = response.data.data.bookingData.filter(i => i.isBooked && i.floor === response.data.data.summaryData[0]?.floorId);
            this.setState({ floorStats: response.data.data.summaryData, bookingDetails: response.data.data.bookingData, floorWiseBookings });
        } catch (error) {
            console.log(error.message)
        }
    }

    getPreviousFloor = async () => {
        if (this.state.currentFloorIndex > 0) {
            let floorWiseBookings = this.state.bookingDetails.filter(i => i.isBooked && i.floor === this.state.floorStats[this.state.currentFloorIndex - 1]?.floorId);
            this.setState({ currentFloorIndex: this.state.currentFloorIndex - 1, floorWiseBookings })
        }
    }

    getNextFloor = async () => {
        if (this.state.currentFloorIndex < this.state.floorStats.length - 1) {
            let floorWiseBookings = this.state.bookingDetails.filter(i => i.isBooked && i.floor === this.state.floorStats[this.state.currentFloorIndex + 1]?.floorId);
            this.setState({ currentFloorIndex: this.state.currentFloorIndex + 1, floorWiseBookings })
        }
    }

    render() {
        return (
            <>
                <Header />
                <div className='container-fluid' style={{ marginLeft: "50px" }}>
                    <div className="filterFormDiv col-md-12">
                        <div className='row'>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <label for="usr" style={{"float":"left"}}>Floor:</label><br />
                                    <Dropdown style={{ width: "100%" }} optionLabel="label" optionValue="value" value={this.state.selectedFloor} options={this.state.floors} onChange={(e) => this.setState({ selectedFloor: e.value })} placeholder="Select a floor" />
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <label for="usr" style={{"float":"left"}}>Zone:</label><br />
                                    <Dropdown style={{ width: "100%" }} optionLabel="label" optionValue="value" value={this.state.selectedZone} options={this.state.zones} onChange={(e) => this.setState({ selectedZone: e.value })} placeholder="Select a zone" />
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <label for="usr" style={{"float":"left"}}>From Date:</label><br />
                                    <Calendar style={{ width: "100%" }} value={this.state.startDate} onChange={(e) => this.setState({ startDate: e.value })}></Calendar>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <label for="usr" style={{"float":"left"}}>To Date:</label><br />
                                    <Calendar style={{ width: "100%" }} value={this.state.toDate} onChange={(e) => this.setState({ toDate: e.value })}></Calendar>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div class="form-group">
                                    <button
                                        id="floorSearch"
                                        onclick={{}}
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
                                        Search
                                        <img
                                            className='btnArrowIcon ml-10'
                                            src={Search_icon}
                                            alt="arrowicon"
                                        />
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
                                            marginRight:"15px",
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

                    <div className="mt-20">
                        <div className='row col-md-12 vertiAlign' style={{ height: "250px", marginTop: "20px" }}>
                            <div className='section3' style={{ height: "150px", margin: "30px", marginTop: "50px", width: "150px" }}>
                                <span onClick={this.getPreviousFloor}> <span onClick={this.getNextFloor}> <img
                                    src={less}
                                    style={{ height: "40px", marginTop: "40px" }}
                                /></span></span>
                            </div>
                            <div className='shadow section2 bg-white rounded' style={{ height: "150px", margin: "50px 30px 30px 0px", marginTop: "50px", width: "450px" }}>
                                <div className='status-title' style={{ margintop: "10px" }}>
                                    <span class="title">Floor</span>
                                    <br>
                                    </br>
                                    <h1 style={{ fontSize: "50px", marginTop: "30px" }}>{this.state.floorStats[this.state.currentFloorIndex]?.floor}</h1>
                                </div>
                            </div>
                            <div className='shadow section2 bg-white rounded' style={{ height: "150px", margin: "50px 30px 30px 0px", width: "450px" }}>
                                <div className='status-title' style={{ margintop: "10px" }}>
                                    <span class="title">Total Allocation Seat</span>
                                    <br>
                                    </br>
                                    <h1 style={{ fontSize: "50px", marginTop: "30px" }}>{this.state.floorStats[this.state.currentFloorIndex]?.totalAllocated}</h1>
                                </div>
                            </div>
                            <div className='shadow section2 bg-white rounded' style={{ height: "150px", margin: "50px 30px 30px 0px", width: "450px" }}>
                                <div className='status-title' style={{ margintop: "10px" }}>
                                    <span class="title" >Booked Seat</span>
                                    <br>
                                    </br>
                                    <h1 style={{ fontSize: "50px", marginTop: "30px" }}>{this.state.floorStats[this.state.currentFloorIndex]?.totalBooked}</h1>
                                </div>
                            </div>
                            <div className='shadow section2 bg-white rounded' style={{ height: "150px", margin: "50px 30px 30px 0px", width: "450px" }}>
                                <div className='status-title' style={{ margintop: "10px" }}>
                                    <span class="title">Available Seat</span>
                                    <br>
                                    </br>
                                    <h1 style={{ fontSize: "50px", marginTop: "30px" }}>{this.state.floorStats[this.state.currentFloorIndex]?.totalAvailable}</h1>
                                </div>


                            </div>
                            <div className='section3' style={{ height: "150px", margin: "30px", marginTop: "50px", width: "150px", marginLeft: "0px" }}>
                                <div className=''>
                                    <span onClick={this.getNextFloor}> <img
                                        src={greater}
                                        style={{ height: "40px", marginTop: "40px" }}
                                    /></span>
                                </div>
                            </div>
                            <hr />
                        </div>



                    </div>

                    <div className="col-md-12" style={{ marginTop: "50px", marginLeft: "50px", height: "600px" }}>
                        <div className='row'>
                            <div className="shadow bg-white rounded col-md-7" style={{ height: "600px" }}>
                                <h3 className='title-font' style={{ fontSize: "20px", marginTop: "30px", textAlign: 'justify' }}>{this.state.floorStats[this.state.currentFloorIndex]?.floor}<span>|</span>
                                    PN8 003 Zone_01 <img
                                        src={BG}
                                        style={{ height: "20px", marginLeft: "50px" }}
                                    /><span style={{ marginLeft: "10px" }}>Booked</span><img
                                        src={book_seat}
                                        style={{ height: "20px", marginLeft: "30px" }}
                                    /><span style={{ marginLeft: "10px" }}>Availabe</span><img
                                        src={seat_Available}
                                        style={{ height: "20px", marginLeft: "30px" }}
                                    /><span style={{ marginLeft: "10px" }}>Not Available</span></h3>

                                <img className="logoCs" src={floorplan} alt="Floor Planning" />
                            </div>
                            <div className="col-md-4 shadow bg-white rounded" style={{ height: "600px", background: "white", marginLeft: "30px", marginRight: "30px", overflow: "scroll", verticalScroll: "None" }}>
                                <table style={{ "text-align": "left" }}>
                                    <thead>
                                        <th style={{ fontSize: "20px" }}>Employee Name</th>
                                        <th></th>
                                        <th style={{ fontSize: "20px" }}>Seat No.</th>
                                        <th style={{ fontSize: "20px" }}>Date</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        {this.state.floorWiseBookings.map(booking => (
                                            <tr>
                                                <td style={{ fontSize: "16px" }}>
                                                    {booking.name}
                                                </td>
                                                <td>
                                                    {booking.birthDate ? (<img className="logoCs" title='Happy Birthday' src={cakeIcon} alt="Floor Planning" />) : ""}
                                                    {booking.officeAttentive === 'true' ? (<img className="logoCs" title='Office Attentive Employee of the month.' src={medalIcon} alt="Floor Planning" />) : ""}
                                                </td>
                                                <td style={{ fontSize: "16px" }}>
                                                    {booking.deskName}
                                                </td>
                                                <td style={{ fontSize: "16px" }}>
                                                    18/09/2022
                                                </td>
                                                <td>
                                                    <DropdownMenu position='right' triggerType='icon' trigger='glyphicon glyphicon-option-vertical'>
                                                        <MenuItem text="View Details" />
                                                        <MenuItem text="View Attendees" />
                                                        <MenuItem text="Monthly Details" />
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>


                    </div>
                </div >


            </>
        );
    }
}

export default Home;