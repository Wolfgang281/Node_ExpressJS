//! IIFE (immediately invoked function express)
//? nodejs internally wraps the complete code in an IIFE which we call as module-wrapper

console.log("hello");

/* (function (exports, require, module, __filename, __dirname) {
  console.log("hello");
})(exports, require, module, __filename, __dirname);
 */

// console.log(__filename);
console.log(__dirname);
