const express = require("express")
const connectDB = require("./config/database")
const app = express()

const User = require("./models/users")


app.post("/signup", async (req, res) => {
  try {
    const user = new User({
      firsName: "Divyansh",
      lastName: "Tamrakar",
      email: "divyansh@belgiumwebnet.com",
      age: 25,
    });
    await user.save();
    res.send("User save succesfully")
  } catch (err) {
    res.status(401).send("Error" + err.message);
  }
});





connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server start running on port");
    });
  })
  .catch((err) => {
    console.log("Databse is facing issue while connecting");
  });





