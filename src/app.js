const express = require("express")

const app = express()
const { adminAuth  , userAuth} = require("./middlewear/auth")

app.use("/admin" , adminAuth)

app.get("/user" , userAuth , (req, res) => {
 res.send("User sent Data")
})
app.get("/admin/getAllUser" , (req, res) => {
   res.send('All the user data')
})

app.delete("/admin/deleteAllUser" , (req, res) => {
   res.send("Delete All user")
})


app.listen(7777 , () => {
    console.log("Server start running on port")
})