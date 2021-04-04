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
// decodes string to it's english equivalent
// "the most important four words for a successful marriage: i'll do the dishes"
```

### in a node context

```
const decipher = require("./decipher");
const sentence = "gsv nlhg rnkligzmg ulfi dliwh uli z hfxxvhhufo nziirztv: r'oo wl gsv wrhsvh";

console.log("sentence to decode: ", sentence);
// "gsv nlhg rnkligzmg ulfi dliwh uli z hfxxvhhufo nziirztv: r'oo wl gsv wrhsvh"

console.time("start");
console.log("results", decipher(sentence));
// "the most important four words for a successful marriage: i'll do the dishes"
console.timeEnd("start");
```
