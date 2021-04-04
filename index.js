const decipher = require("./decipher");
//const cipher = require("./cipher");
const CYPHER = process.argv.slice(2)[0];

// console.log("sentence to code: ", CYPHER);
// console.time("start");
// console.log("results", cipher(CYPHER));
// console.timeEnd("start");

console.log("sentence to decode: ", CYPHER);
console.time("start");
console.log("results", decipher(CYPHER));
console.timeEnd("start");
