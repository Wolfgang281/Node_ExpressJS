//? importing using commonJS

//! let variableName = require("path of the file")
//& providing ext is not mandatory

// const greet = require("./f1");

// console.log("this is file 2 ");
// greet();

//? while importing f1.js, nodejs executes that file also

//! while importing a single module (which was exported using module.exports = name) we can use any variable

//? order of execution
//~ a) file 2 is executed
//~ a) first line is import statement
//~ a) flow will go to the file1.js
//~ a) once file1.js is executed, fil2.js will continue executing

//! ========================== example-2 ====================================

// let value = require("./f1");
// console.log("value: ", value);
// value.greet();
// value.printName();
// console.log(value.user);

let { user, greet, printName } = require("./f1");

greet();
printName();
console.log(user);
