const express = require("express")
const connectDB = require("./config/database")
const app = express()
const User = require("./models/users")
const {validationSignUp} = require("./utils/validation")
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const {userAuth} = require("./middlewear/auth")
const jwt = require('jsonwebtoken');


app.use(express.json()) //middlewear to read the json data
app.use(cookieParser())

app.post("/signup", async (req, res) => {
  try {
    // validationSignUp(req);
     const {firstName,lastName,emailId,password} = req.body
     const passwordHash = await bcrypt.hash(password , 10)
     const user = new User({
      firstName,
      lastName,
      emailId,
      password : passwordHash
    });
     await user.save();
    res.send("User save succesfully")
  } catch (err) {
    res.status(401).send("Error" + err.message);
  }
});

app.post("/login" ,  async(req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = await jwt.sign({_id : user._id}, "DevTinder@123#")
      res.cookie("token" , token)
      res.send("User login succesfully!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(401).send("Error " + err.message);
  }
});


app.get("/profile" , userAuth , (req, res) => {
  try{
  const user = req.user
  res.send(user)
  }catch(err){
    res.status(401).send("Error " + err.messsage)
  }
})

app.get("/user" , async(req, res) => {
  const userEmail = req.body.emailId
  try{
   const user = await User.find({emailId : userEmail})
   if(!user){
    res.status(404).send("User not found")
   }else{
   res.send(user)
   }
  }catch(err){
    res.status(401).send("User not found")
  }
})

app.get("/feed" , async(req, res) => {
  try{
   const users = await User.find({})
   if(!users){
    res.status(404).send("No data found")
   }else{
    res.send(users)
   }
  }catch(err){
    res.status(401).send("Something went wrong")
  }
})

app.delete("/user" , async(req, res)=> {
  const userId = req.body.userId
  try{
   const user = await User.findByIdAndDelete({ _id : userId})
   res.send("User Deleted Succesfully")
  }catch(err){
   res.status(401).send("Something went wrong")
  }
})

app.patch("/user" , async(req, res) => {
  const userId = req.body.userId
  const data = req.body
   try{
    await User.findByIdAndUpdate({_id : userId} , data , {returnDocument : "after"})
    res.send("Update succesfully")
   }catch(err){
    res.status(401).send("Upada Failed" + err.message)
   }
})

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





