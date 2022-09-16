const express = require('express');
const app = express();
const route = express.Router();

let Employees = require('../controllers/Employees');
let Public = require('../controllers/Public');


route.route('/employee/:id?')
    .get(Employees.get)
    .post(Employees.post)
    .put(Employees.put)
    .delete(Employees.del);

route.route('/public/login').post(Public.login);
module.exports = route;