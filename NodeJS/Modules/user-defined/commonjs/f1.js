// function greet() {
//   console.log("hello");
// }
// console.log("this is file 1");

// //? export using commonJS
// //! module.exports = variableName

// module.exports = greet; //~ export

//! ===================== example-2 ===================================

let user = {
  name: "sri",
  age: 34,
};

function greet() {
  console.log("hello");
}

function printName() {
  console.log("sri");
}

// module.exports = printName;
// module.exports = greet;
// module.exports = user;

//~ if we are exporting like this then only last variable is getting exported

//? module.exports = {n1, n2, .....}
module.exports = { user, greet, printName };
