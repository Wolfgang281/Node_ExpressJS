//? always perform destructuring while importing named export
//? and write .js in import statement

//! syntax to import named export
// import {v1,v2,v3...} from "path of the file"

import divide, { add, mul, sub } from "./calculation.js";

mul(2, 2);
add(1, 2);
sub(28, 8);

divide(10, 2);

//! syntax to import default export
// import variableName from "path"

//! no module-wrapper is available in esm
