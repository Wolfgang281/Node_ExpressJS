//~ console.log("end");

//~ for (let i = 0; i < 10000000000; i++) {}

//~ console.log("start");
//~ console.log("middle");

//! above code is synchronous in nature, in order to execute line number 3 we have to wait until call stack finishes the above two lines (blocking code)
//? synchronous == blocking

//& =====================================================================
//! asynchronous code -->

//~ console.log("1");

//~ setTimeout(() => {
//~   console.log("inside setTimeout");
//~ }, 4000);

//~ console.log("2");
//~ console.log("3");

//! =======================================================

//~ console.log("1");

//~ setTimeout(() => {
//~   console.log("inside setTimeout");
//~ }, 0);

//~ console.log("2");
//~ console.log("3");

//! =======================================================

//~ console.log("1");

//~ setTimeout(() => {
//~   console.log("st1");
//~ }, 0);

//~ console.log("2");

//~ setTimeout(() => {
//~   console.log("st2");
//~ }, 3000);

//~ console.log("3");

//! =======================================================

// console.log("1");

// setTimeout(() => {
//   for (let i = 0; i < 1000000000000; i++) {}
//   console.log("for loop finished");
// }, 0);

// console.log("2");

// console.log("3");

//? asynchronous code or non-blocking code --> setInterval(), Promises, queueMicrotask, Mutation

// console.log("1");
// console.log("2");
// console.log("3");

//! Promises --> promises are objects in javascript, which represents eventual completion of an asynchronous task

// let promise = new Promise((resolve, reject) => {
//   //! some lines of code
//   let a = 30;
//   if (a == 30) {
//     resolve({ username: "abc", userAge: 34, id: 23 });
//   } else {
//     reject("No User Found!!!!");
//   }
// });
// console.log("promise: ", promise);

//? then(), catch() --> it is used to handle the promise
//? then() will be used to print the data when the promise is resolved(true)
//? catch() will be used to print the data when the promise is rejected(false) or if an error occurs

// promise
//   .then((payload) => {
//     console.log("payload: ", payload);
//     console.log("success");
//   })
//   .catch((error) => {
//     console.log("error: ", error);
//     console.log("failure");
//   });

//! if promise is resolved, then then() will execute. if we want to get the promise data use a variable inside then() callback
//! if promise is rejected/error, then catch() will execute

// console.log("1");

// let fetchResponse = fetch("https://fakestoreapi.com/products");
// console.log("fetchResponse: ", fetchResponse);

// console.log("2");

// fetchResponse
//   .then((payload) => {
//     // console.log("payload: ", payload); //? Response Object
//     //! convert it to JSON
//     let jsonData = payload.json();
//     // console.log("jsonData: ", jsonData);
//     jsonData
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((error) => {
//     console.log("error: ", error);
//   });
//? then-catch nesting --> async-await

//! async-await: async is used in function declaration and await is used inside function body. async function will always returns a promise
//? await should be used where a statements returns a promise
//? AWAIT SUSPENDS THE ASYNC FUNCTION EXECUTION UN-TILL THE PROMISE IS RESOLVED

async function fetchProds() {
  try {
    let fetchResponse = await fetch("https://fakestoreapi.com/products");
    let jsonData = await fetchResponse.json();
    console.log("jsonData: ", jsonData);
  } catch (error) {
    console.log("error occurred");
  }
}
// fetchProds();

//! ==========================================================

console.log("1");

async function apiCall() {
  console.log("making an api call");
  await fetch("https://fakestoreapi.com/products");
  console.log("api called");
}

function printName() {
  console.log("hi abc");
}

apiCall();
printName();

console.log("2");

//? 1, hi abc, 2 "mak, api called"
