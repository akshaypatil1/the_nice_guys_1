const bcrypt = require("bcrypt");

let generatePassword = async (password) => {
    const salt = await bcrypt.genSalt(13);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}
module.exports.generatePassword = generatePassword;

let isValidPassword = async(inputPassword, hash) => {
    let isValidPassword = await bcrypt.compare(inputPassword, hash);
    return isValidPassword
}
module.exports.isValidPassword = isValidPassword;
