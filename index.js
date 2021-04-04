const decipher = require("./decipher");
const CYPHER = process.argv.slice(2)[0];

console.log("sentence to decode: ", CYPHER);

console.time("start");
console.log("results", decipher(CYPHER));
console.timeEnd("start");
