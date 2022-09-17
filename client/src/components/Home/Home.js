import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Header from "../common/Header/Header";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import "./Home.css";
import * as HomeService from '../../services/HomeService'

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
        }
    }

    componentDidMount() {
        this.fetchFilters()
    }

    fetchFilters = async () => {
        try {
            let response = await HomeService.getFilters();
            this.setState({ floors: response.data.data.floors, zones: response.data.data.zones });
        } catch (error) {
            console.log(error.log)
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
                        <div className='row'>

                        </div>


                    </div>



                </div>

            </>
        );
    }
}

export default Home;