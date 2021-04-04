const {
  decypher,
  enrich,
  getWordsByLength,
  findBestNextWord,
  cleanUpSentence,
} = require("./utils");

const findByLetterCount = (cypher) => {
  var maps = [{}];

  const cleanCypher = cleanUpSentence(cypher);
  const wordByLength = getWordsByLength(cleanCypher);

  maps = Object.entries(wordByLength).reduce(
    (acc, [length, wordArray]) =>
      wordArray.reduce((acc, word) => enrich(acc, word, cypher), acc),
    maps
  );

  return maps.map((m) => decypher(cypher, m));
};

const findByNextClosest = (cypher) => {
  var maps = [{}];

  const cleanCypher = cleanUpSentence(cypher);

  var wordArray = cleanCypher.split(" ");

  let next = findBestNextWord(wordArray, maps[0]);
  while (wordArray.length > 1 && maps.length > 0 && next) {
    maps = enrich(maps, next, cypher);
    wordArray = wordArray.filter((w) => w !== next);
    next = findBestNextWord(wordArray, maps[0]);
  }

  return maps.map((m) => decypher(cypher, m));
};

module.exports = findByNextClosest;
