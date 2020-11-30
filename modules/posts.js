let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let postSchema = new Schema({
    id: String,
    title: String,
    date: Date,
    description: String,
    text: String,
    country: String,
    imageURL: String

});
// we require schema and class/model because schema gives us structure and there can be multiple
// schema so then by defining class we tell out of these many schemas which schema this class
// will use. Then from this class we build objects now this objects will have this particular 
// schema structure not the other schema structure 
let Post = mongoose.model("Post", postSchema);

module.exports = {
    Post : Post
}