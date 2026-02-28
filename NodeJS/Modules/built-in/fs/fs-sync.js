//! fs stands for file system. this will provide utilities to perform CRUD on files and folders present on the OS

//? syntax to import built-in modules
// let variableName = require("node:name of the module")
// import variableName from "node:name of the module"

const fs = require("node:fs");

//! ================= USING fs SYNCHRONOUSLY =============================

//? 1) creating a folder
try {
  fs.mkdirSync("./Project");
  console.log("Folder created");
} catch (error) {
  if (error.code === "EEXIST") console.log("Folder already exists");
}

//? 2) creating a file inside folder
try {
  fs.writeFileSync("./Project/index.txt", "This is initial data");
  console.log("File created and data written");
} catch (error) {
  console.log("Error while creating file:", error.message);
}

//? 3) reading a file
try {
  let contents = fs.readFileSync("./Project/index.txt", "utf-8");
  console.log("File contents:\n", contents);
} catch (error) {
  console.log("Error while reading file:", error.message);
}

//? 4) appending data (updating file)
try {
  fs.appendFileSync("./Project/index.txt", "\nThis is appended data");
  console.log("Data appended successfully");
} catch (error) {
  console.log("Error while appending:", error.message);
}

//? 5) reading again after append
try {
  // let updatedContents = fs.readFileSync("./Project/index.txt", {
  //   encoding: "utf-8",
  // });
  let updatedContents = fs.readFileSync("./Project/index.txt");
  console.log("Updated contents:\n", updatedContents);
} catch (error) {
  console.log("Error while reading updated file:", error.message);
}

//? 6) renaming file
try {
  fs.renameSync("./Project/index.txt", "./Project/main.txt");
  console.log("File renamed successfully");
} catch (error) {
  console.log("Error while renaming:", error.message);
}

//? 7) deleting file
try {
  fs.unlinkSync("./Project/main.txt");
  console.log("File deleted successfully");
} catch (error) {
  if (error.code === "ENOENT") console.log("File not found");
  else console.log("Error while deleting file:", error.message);
}

//? 8) deleting folder
try {
  fs.rmdirSync("./Project");
  console.log("Folder deleted successfully");
} catch (error) {
  console.log("Error while deleting folder:", error.message);
}

//? openSync() -> returns file descriptor (number)
// format -> fs.openSync("path", "flag")

try {
  const fd = fs.openSync("./sample.txt", "w"); // w -> write mode (create if not exists)
  fs.writeSync(fd, "Writing using file descriptor");
  fs.closeSync(fd);
  console.log("File created using openSync()");
} catch (error) {
  console.log("Error using openSync:", error.message);
}

console.log(globalThis);
