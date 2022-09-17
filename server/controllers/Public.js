let store = require('../models/store');
let { success, failure } = require("../helpers/response");
const jwt = require('jsonwebtoken');

let findProductById = function (pid) {
    let found = store.store.Employee.filter(function (p) {
        return p.pid === parseInt(pid)
    });
    if (found && found.length > 0) {
        return found[0];
    }
    return null;
};

const login = async (req, res, next) => {
    try {
        console.log(req.body)
        let found = findProductById(req.body.pid);
        if (found) {
            jwt.sign({ found }, global.SuperSecRetKey, { expiresIn: 60 * 60 }, (err, token) => {
                success(res, 200, token, next);
            });
        } else {
            failure(res, 404, "User not found", next);
        }
    } catch (err) {
        failure(res, 500, err.message, next);
    }
}
module.exports.login = login;
