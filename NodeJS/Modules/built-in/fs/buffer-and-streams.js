//! buffer -< it is an array like structure which holds data in binary format ()
//? once a buffer is created, it's size cannot be modified
//? it will be destroyed once the operation is completed
//? it is a memory taken in RAM, which holds the data temporarily

//! =================================================================
import { Buffer } from "node:buffer";

// in nodejs, we have a buffer class, which is a global class.
//? using which we can perform operations on buffer (we can create buffers, we can write on buffers, etc...)

let buff1 = Buffer.from("Hello"); // 5 bytes
console.log("buff1: ", buff1);
console.log("json", buff1.toJSON());

buff1.write("this is me"); // 10 bytes
console.log("buff1: ", buff1);
console.log("json", buff1.toJSON());
console.log(buff1.toString());

setTimeout(() => {
  let buff2 = Buffer.alloc(2e9, "a");
}, 5000);

//TODO:
// console.log(buff1.writeableLength);
