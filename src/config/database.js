const mongoose = require('mongoose');


const connectDB = async() => {
  await mongoose.connect("mongodb+srv://cousesanshul:iPBnQxHAgrXkls2u@cluster0.576vbux.mongodb.net/devTinder")
}

module.exports = connectDB