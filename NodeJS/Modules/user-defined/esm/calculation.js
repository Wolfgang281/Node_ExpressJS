//! exporting using esm
//~ named export

export let add = (a, b) => {
  console.log(a + b);
};

export let sub = (a, b) => {
  console.log(Math.abs(a - b));
};

export function mul(a, b) {
  console.log(a * b);
}

//! default export
//? export default variableName

function divide(a, b) {
  if (b === 0) return "not possible";
  console.log(a / b);
}

export default divide;
//! we can perform one default export per file

console.log(import.meta.filename);

console.log(import.meta.dirname);
