let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let callbackRequestSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
});

// The 3rd argument specifies in which collection we have to store the data if there are more than 1
let CallbackRequest = mongoose.model("CallbackRequest", callbackRequestSchema,"callback-request");

module.exports = {
    CallbackRequest
};