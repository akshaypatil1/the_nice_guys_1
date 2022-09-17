
// Bookings model
let store = require('../models/store');
let { success, failure } = require("../helpers/response");
var moment = require('moment');

function BookingsController() {
    this.get = function (req, res, next) {
        success(res, 200, store.store.Bookings, next);
    };

    this.getById = function (req, res, next) {
        let found = findProductById(req);
        if (found) {
            success(res, 200, found, next);
        } else {
            failure(res, 404, "Product not found", next);
        }
    };

    this.getBookings = function (req, res, next) {

        let getAllChildData = getAllChild(parseInt(req.body.pid));
        let grandChildData = []
        //if DIR then following loop
        if (getAllChildData.length > 0) {
            getAllChildData.forEach(emp => {
                let data = getAllChild(parseInt(emp.pid));
                if (data.length > 0) {
                    grandChildData.push(...data);
                }
            });
        }
        let allEmps = [...getAllChildData, ...grandChildData];
        let allEmpPids = allEmps.map(i => i.pid);
        //&& i.floor === parseInt(req.body.floor)
        let getBookingsData = store.store.Bookings.filter(i => allEmpPids.includes(i.pid) && compare(req.body.date, i.fromDate, i.toDate));

        let _getBookingsData = getBookingsData.map(i => {
            i.name = store.store.Employee.filter(j => j.pid === i.pid).map(q => q.name).join();
            return i;
        })

        let myPids = [parseInt(req.body.pid)]
        if (req.body.roleId === 'DIR') {
            getAllChildData.forEach(emp => {
                myPids.push(parseInt(emp.pid));
            })
        }
        let getDeskAllocatedData = getAllSeatsAllocated(myPids);

        let finalJson = getDeskAllocatedData.map(i => {
            let getBookingInfo = _getBookingsData.find(j => j.deskName === i.deskName);
            let result = {
                floor: i.floor,
                zone: i.zone,
                deskName: i.deskName,
                pid: "",
                name: "",
                isBooked: false,
                isUsingSyatem: true
            }
            console.log(i.deskName, _getBookingsData, getBookingInfo);
            if (getBookingInfo) {
                result.pid = getBookingInfo.pid;
                result.name = getBookingInfo.name;
                result.isBooked = true;
            }
            return result;
        })

        let tmpData = finalJson.reduce(
            (result, currentValue) => {
                if (!result.includes(currentValue.floor)) {
                    result.push(currentValue.floor)
                }
                return result;
            },
            []
        );
        let summaryData = [];
        tmpData.forEach(i => {
            summaryData.push({
                floor: `LEVEL_${i}`,
                floorId: i,
                totalAllocated: finalJson.filter(j => j.floor === i).length,
                totalBooked: finalJson.filter(j => j.floor === i && j.isBooked).length,
                totalAvailable: finalJson.filter(j => j.floor === i && !j.isBooked).length,
            })
        })

        success(res, 200, { bookingData: finalJson, summaryData }, next);

    };

    function getAllChild(pid) {
        return store.store.Employee.filter(i => i.managersPid === parseInt(pid));
    }

    function getAllSeatsAllocated(pids) {
        return store.store.DeskAllocations.filter(i => pids.includes(i.pid));
    }

    function compare(inputDate, fromDate, toDate) {
        var inputDate_ = moment(inputDate, "DD/MM/YYYY");
        var fromDate_ = moment(fromDate, "DD/MM/YYYY");
        var toDate_ = moment(toDate, "DD/MM/YYYY");
        if (fromDate_ <= inputDate_ && inputDate_ <= toDate_) {
            return true
        }
        return false;
    }

};

module.exports = new BookingsController();