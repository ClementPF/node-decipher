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

  while (wordArray.length > 1 && maps.length > 0) {
    next = findBestNextWord(wordArray, maps[0]);
    if (!next) break;
    maps = enrich(maps, next, cypher);
    wordArray = wordArray.filter((w) => w !== next);
  }

  return maps.map((m) => decypher(cypher, m));
};

module.exports = findByNextClosest;
