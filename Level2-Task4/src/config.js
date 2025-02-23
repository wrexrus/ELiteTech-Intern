// import the module
const mongoose = require("mongoose");
// create a database connection
const connect =  mongoose.connect("mongodb://localhost:27017/Login-tut");

// check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});

// create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("users",LoginSchema);

module.exports = collection;