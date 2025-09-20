const express = require("express")

const app = express()
const {adminAuth , userAuth}= require("./middlewear/auth")

app.use("/admin" , adminAuth)

app.use("/user" , userAuth)

app.get("/admin/getAllUser" , (req, res) => {
  res.send("All admin Data")
})

app.get("/user/getAllUser" , (req, res) => {
  try{
   res.send("All user Data")
  }catch(error){
    res.status(500).send(error)
  }
  
})

app.delete("/admin/deleteUser", (req, res) => {
   res.send("Delete All the users")
})


app.listen(7777 , () => {
    console.log("Server start running on port")
})