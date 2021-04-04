const wordlist = require("wordlist-english");
// const englishWords = wordlist["english/10"].concat(wordlist["english/20"]);
const englishWords = wordlist["english"];
const { ONE_LETTER_WORDS, ABBREVIATED_SHORT_VERB } = require("./constants");

const memo = [];
const getNLetterWordDict = (n) => {
  if (memo[n]) return memo[n];

  const words = Object.values(englishWords).filter((word) => word.length === n);

  const abbreviatedVerbs = Object.keys(ABBREVIATED_SHORT_VERB)
    .map((verb) => verb.replace("'", ""))
    .filter((verb) => verb.length === n);

  memo[n] = words.concat(abbreviatedVerbs);

  return memo[n];
};

memo[1] = ONE_LETTER_WORDS;

module.exports = {
  englishWords,
  getNLetterWordDict,
};
