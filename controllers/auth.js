let jwt = require("jsonwebtoken");

let secret = "nfj657fejnf";

// This function will generate token and will return it
function generateToken(user){

    let payload = {
        email: user.email,
        password: user.password
    }
    return jwt.sign(payload, secret); // return token
}

function checkToken(token){

   return jwt.verify(token, secret); //return True or false
}

module.exports = {generateToken, checkToken};