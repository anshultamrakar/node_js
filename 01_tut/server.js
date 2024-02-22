// How node js is different from vanilla js
// Node run on the server - not in browser(backend not the Front end)
// The console is the terminal window
console.log("hello world")

// It has Global Object instead of windows Obj
//  It has common JS module instead of ES6
// It is missing some JS API like fetch

// console.log(global)


const os = require('os')
const path = require('path')
const {add , subtract , multiply , divide} = require("./math")

console.log(add(3 , 6))
console.log(subtract(12 , 6))
console.log(multiply(3 , 6))
console.log(divide(9 , 6))


// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__filename)
// console.log(__dirname)
// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))








