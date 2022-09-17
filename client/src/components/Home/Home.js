import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Header from "../common/Header/Header";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import "./Home.css";
import * as HomeService from '../../services/HomeService'
import jwt_decode from "jwt-decode";

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
                date: "17/09/2022",
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
                <div className="filterFormDiv col-md-12">
                    <div className="filterContainer" style={{ marginRight: "990px" }}>
                        <div className="inlineDisplay vertiAlign mr-30">
                            <label className='heading-label'>
                                Floor
                            </label>
                            <br></br>
                            <Select options={this.state.floors} isSearchable={true} onChange={e => this.setState({ selectedFloor: e.value })} />
                        </div>
                        <div className="inlineDisplay vertiAlign mr-15">
                            <label className='heading-label'>
                                Zone
                            </label>
                            <br></br>
                            <Select options={this.state.zones} isSearchable={true} onChange={e => this.setState({ selectedZone: e.value })} />
                        </div>
                        <div className="inlineDisplay vertiAlign mr-15" style={{ verticalAlign: "top" }}>
                            <label className='heading-label filterLabe'>
                                From Date
                            </label>
                            <br></br>
                            <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({ startDate: date })} />
                        </div>
                        <div className="inlineDisplay vertiAlign mr-15" style={{ verticalAlign: "top" }}>
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
                                color: "white",
                                background: "black",
                                border: "none",
                                fontSize: "18px",
                                fontFamily: "Credit Suisse Type",
                                height: "60px",
                                width: "150px",
                                marginRight: "20px",
                                padding: "15px",
                                marginTop: "20px",
                            }}
                        >
                            Search

                            <img
                                className='btnArrowIcon'
                            // src={arrowicon}
                            //alt="arrowicon"
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
                                height: "60px",
                                width: "200px",
                                marginRight: "20px",
                                padding: "15px",
                                marginTop: "20px",
                            }}
                        >
                            <img
                                className='btnArrowIcon'
                            // src={arrowicon}
                            // alt="arrowicon"
                            />
                            Create Desk Allocation


                        </button>
                    </div>

                    <div className="mt-20" style={{ background: "grey", height: "30px" }}>
                        <div className='row col-md-12 ' style={{ height: "200px", marginTop: "20px" }}>
                            <div className=''>
                                <span onClick={this.getPreviousFloor}>{'<'} </span>
                            </div>
                            <div className='section2' style={{ height: "150px", margin: "30px", marginTop: "50px", marginLeft: "160px", width: "450px" }}>
                                <div className='status-title'>
                                    <span class="title">Floor</span>
                                    <br>
                                    </br>
                                    <h1>{this.state.floorStats[this.state.currentFloorIndex]?.floor}</h1>
                                </div>
                            </div>
                            <div className='section2' style={{ height: "150px", margin: "50px 30px 30px 0px", width: "450px" }}>
                                <div className='status-title'>
                                    <span class="title">Total Allocation Seat</span>
                                    <br>
                                    </br>
                                    <h1>{this.state.floorStats[this.state.currentFloorIndex]?.totalAllocated}</h1>
                                </div>
                            </div>
                            <div className='section2' style={{ height: "150px", margin: "50px 30px 30px 0px", width: "450px" }}>
                                <div className='status-title'>
                                    <span class="title" >Booked Seat</span>
                                    <br>
                                    </br>
                                    <h1>{this.state.floorStats[this.state.currentFloorIndex]?.totalBooked}</h1>
                                </div>
                            </div>
                            <div className='section2' style={{ height: "150px", margin: "50px 30px 30px 0px", width: "450px" }}>
                                <div className='status-title'>
                                    <span class="title">Available Seat</span>
                                    <br>
                                    </br>
                                    <h1>{this.state.floorStats[this.state.currentFloorIndex]?.totalAvailable}</h1>
                                </div>


                            </div>
                            <div className=''>
                                <div className=''>
                                    <span onClick={this.getNextFloor}> {'>'}</span>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="col-md-12" style={{ marginTop: "300px", marginLeft: "50px" }}>
                        <div className='row'>
                            <div className="col-md-7" style={{ height: "400px", marginTop: "20px", background: "grey", marginRight: "30px", marginLeft: "50px" }}>
                            </div>
                            <div className="row col-md-4" style={{ height: "400px", marginTop: "20px", background: "grey", marginRight: "30px" }}>
                                {this.state.floorWiseBookings.map(booking => (
                                    <p key={booking.deskName}><span>{booking.name}</span><span>{booking.deskName}</span><span>{booking.isUsingSyatem}</span></p>
                                ))}
                            </div>
                        </div>


                    </div>
                </div >

            </>
        );
    }
}

export default Home;