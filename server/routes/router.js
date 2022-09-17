const express = require('express');
const Desk = require('../controllers/Desk');
const app = express();
const route = express.Router();

let Employees = require('../controllers/Employees');
let Public = require('../controllers/Public');


route.route('/employee/:id?')
    .get(Employees.get)
    .post(Employees.post)
    .put(Employees.put)
    .delete(Employees.del);

route.route("/getDropdownsForDesks")
    .get(Desk.getFloorDropdowns);

route.route('/login').post(Public.login);
module.exports = route;