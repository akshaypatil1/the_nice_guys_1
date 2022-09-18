const express = require('express');
const app = express();
const route = express.Router();

let Employees = require('../controllers/Employees');
let Bookings = require('../controllers/Bookings');
let Public = require('../controllers/Public');
const Desk = require('../controllers/Desk');

route.route('/employee/:id?')
    .get(Employees.get)
    .post(Employees.post)
    .put(Employees.put)
    .delete(Employees.del);

route.route("/getDropdownsForDesks")
    .get(Desk.getFloorDropdowns);

route.route('/bookings/:pid?')
    .get(Bookings.get)
    .post(Bookings.getBookings)
// .put(Bookings.put)
// .delete(Bookings.del);

route.route("/getFloorsList")
.get(Bookings.getAssignedFloors);

route.route("/getZoneList")
.get(Bookings.getAssignedZones);

route.route('/login').post(Public.login);
module.exports = route;