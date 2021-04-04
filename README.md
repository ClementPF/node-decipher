# node-decipher

a node utils to decipher english ciphered text

# install

```
npm install
```

## example:

### with the CLI

```
npm start "gsv nlhg rnkligzmg ulfi dliwh uli z hfxxvhhufo nziirztv: r'oo wl gsv wrhsvh"
```

### in a node context

```
const decipher = require("./decipher");
const sentence = "gsv nlhg rnkligzmg ulfi dliwh uli z hfxxvhhufo nziirztv: r'oo wl gsv wrhsvh";

console.log("sentence to decode: ", sentence);

console.time("start");
console.log("results", decipher(sentence));
console.timeEnd("start");
```
