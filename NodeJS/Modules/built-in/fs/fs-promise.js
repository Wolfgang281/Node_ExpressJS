import fsP from "node:fs/promises";

//~ ============= using promises ===========================

//! creating a folder
//? method name -< mkdir()
//? format -< mkdir("path/name").then().catch()

// let result = fsP.mkdir("./server"); //? at this point of time even if we are not handling this promise, folder will be created (if there are no errors) to ensure proper flow we use then catch to handle the promise
// console.log("result: ", result);

// result
//   .then(() => {
//     console.log("adding some more code");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//! creating a folder
//? method name -< readFile()
//? format -< mkdir("path", "encoding").then().catch()

let data = fsP.readFile("./fs-async.js", "utf-8");
// console.log("data: ", data);

// data
//   .then((payload) => {
//     console.log(payload);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log(":finally");
//   });

//~ =============================================
// let createFile = fsP.writeFile("./demo.txt", "create-1");
// createFile.then(() => {
//   console.log("created");
// });

// let appendFile1 = fsP.appendFile("./demo.txt", "a1");
// appendFile1.then(() => {
//   console.log("a1");
// });

// let appendFile2 = fsP.appendFile("./demo.txt", "a2");
// appendFile2.then(() => {
//   console.log("a2");
// });

//~ =============================================

// let createFile = fsP.writeFile("./demo.txt", "create-1");
// createFile.then(() => {
//   console.log("created");

//   let appendFile1 = fsP.appendFile("./demo.txt", "a1");
//   appendFile1.then(() => {
//     console.log("a1");

//     let appendFile2 = fsP.appendFile("./demo.txt", "a2");
//     appendFile2.then(() => {
//       console.log("a2");
//     });
//   });
// });
// then/catch hell

//~ =====================async - await ========================

async function fsOP() {
  await fsP.writeFile("./demo.txt", "w1");
  console.log("w");
  await fsP.appendFile("./demo.txt", "a1");
  console.log("a1");
  await fsP.appendFile("./demo.txt", "a2");
  console.log("a2");
}

fsOP();
