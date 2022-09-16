
// Employee model
let { success, failure } = require("../helpers/response");

const login = async (req, res, next) => {
    try {
        success(res, 200, [], next);
    } catch (err) {
        failure(res, 500, err.message, next);
    }
}
module.exports.login = login;
