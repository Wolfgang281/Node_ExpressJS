//! streams -> sending data from source to destination in continuous chunks
//? in nodejs we have 4 different streams,

//~ 1) readable stream -> using this we can read the data in chunks
// method name -> createReadStream()

//~ 2) writeable stream -> using this we can write data in chunks
// method name -> createWriteStream()

//~ 3) duplex stream (copy, paste) -> in this we can perform both read and write simultaneously
// pipe()

//~ 4) transform stream (compress) -> similar to duplex, but data can be modified or transformed

import fs from "node:fs";
// import fs from "node:fs"

//! [======================] readable stream ===================
// method name -> createReadStream()
// format -> createReadStream("path", "encoding")
// format -> createReadStream("path", {encoding:"value"})

let payload = fs.createReadStream("./fs-callback.js", {
  //? (events) this will emit an event named "data"
  encoding: "utf-8",
  highWaterMark: 50000, // what is the size of the chunk
});
// console.log("payload: ", payload);

//! whenever we wan to listen to an event we use on()
//? on("eventName", callback)

payload.on("data", (chunk) => {
  console.log(`chunk length: ${chunk.length}`);
  console.log(`chunk: ${chunk}`);
  console.log(`======================================`);
});
