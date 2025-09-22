const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firsName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String
    },
    age : {
        type : Number
    }
})



module.exports = mongoose.model("User" , UserSchema)