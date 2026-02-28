// import fs from "node:fs"
import fs from "node:fs";

//! =================== using callbacks ======================

//? error first callbacks -> node/express: the first parameter will be reserved for error

//! file read
//? method name -> fs.readFile()
//? format -> fs.readFile("path", "encoding", ()=>{})
//? format -> fs.readFile("path", "encoding", function(){} )

// console.log(1);

// fs.readFile("./fs-sync.js", "utf-8", function (err, data) {
//   if (err) return console.log("error");
//   // 10min
//   console.log(data);
// });

//   console.log("file read"); // X this is wrong

// console.log(2);

//! file write
//? method name -> fs.writeFile()
//? format -> fs.writeFile("path", "data", (err)=>{})
//? format -> fs.readFile("path", "data", function(){} )

// fs.writeFile("./home.txt", "some data", (err) => {
//   if (err) console.log(err);
//   console.log("file created");
// });

//! ===================================================
// file create and append

// fs.writeFile("./demo.txt", "this is write file\n", (err) => {
//   if (err) return console.log(err);
//   console.log("file created");
// });

// fs.appendFile("./demo.txt", "this is appendFile1", (err) => {
//   if (err) return console.log(err);
//   console.log("file appended-1");
// });

// fs.appendFile("./demo.txt", "this is appendFile2", (err) => {
//   if (err) return console.log(err);
//   console.log("file appended-2");
// });

// /! =================================
fs.writeFile("./demo.txt", "this is write file\n", (err) => {
  if (err) return console.log(err);
  console.log("file created");

  fs.appendFile("./demo.txt", "this is appendFile1", (err) => {
    if (err) return console.log(err);
    console.log("file appended-1");

    fs.appendFile("./demo.txt", "this is appendFile2", (err) => {
      if (err) return console.log(err);
      console.log("file appended-2");
    });
  });
});
