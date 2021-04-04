const { ENGLISH_DOUBLE_LETTERS } = require("./constants");
const { getNLetterWordDict } = require("./dictionnary");

const decodeWith = (s, map) =>
  s
    .toLowerCase()
    .split("")
    .map((c) => (map[c] ? map[c] : c))
    .join("");

const decypher = (s, map) =>
  s
    .toLowerCase()
    .split("")
    .map((c) => (map[c] ? map[c] : c))
    .join("");

const doubleLetters = (word) =>
  word.split("").filter((c, i, s) => i !== 0 && c == s[i - 1]);

const getConversionMap = (w1, w2) =>
  w1.split("").reduce((acc, c, i) => ({ ...acc, [c]: w2.split("")[i] }), {});

const canBeAssigned = (word1, word2) => {
  const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const map = getConversionMap(word1, word2);

  const reverseMap = Object.entries(map).reduce(
    (acc, [k, v]) => ({ ...acc, [v]: k }),
    {}
  );

  return equals(word1, decodeWith(word2, reverseMap));
};

const respectDoubleLetters = (map, cypher) =>
  Object.entries(map)
    .filter(([k, v]) => doubleLetters(cypher).includes(k))
    .every(([k, v]) => ENGLISH_DOUBLE_LETTERS.includes(v));

const isUnique = (c, i, arr) => arr.indexOf(c) === i;
const noDupe = (map) => Object.values(map).every(isUnique);

const enrich = (maps, word, cypher) => {
  console.log("enrich", word, maps.length);
  return maps.reduce((acc, map, i) => {
    if (i % 1000 == 0)
      console.log(
        "enrich",
        `${i} / ${maps.length}`,
        `result size: ${acc.length}`
      );
    const wordToFind = word;
    const sameLengthWords = getNLetterWordDict(word.length);

    const compatibleWithMap = (w, word, map) => {
      const notAssignedOrValid = (char, i) =>
        !map[char] || w.charAt(i) === map[char];
      return word.split("").every(notAssignedOrValid);
    };

    const words = sameLengthWords
      .filter((w) => compatibleWithMap(w, wordToFind, map))
      .filter((w) => canBeAssigned(wordToFind, w));

    if (!words.length) return acc;

    const newMaps = words
      .flatMap((word) => ({
        ...map,
        ...getConversionMap(wordToFind, word),
      }))
      .filter(noDupe)
      .filter((map) => respectDoubleLetters(map, cypher));

    return [...acc, ...newMaps];
  }, []);
};

const getWordsByLength = (sentence) =>
  sentence.split(" ").reduce(
    (acc, w, i) => ({
      ...acc,
      [w.length]: acc[w.length] ? [...acc[w.length], w].filter(isUnique) : [w],
    }),
    {}
  );

const findBestNextWord = (words, map) => {
  const uniqueLetters = (w) => w.split("").filter(isUnique);

  const countUnkownChars = (w) =>
    uniqueLetters(w).reduce(
      (acc, c) => ({
        ...acc,
        [w]: (acc[w] ? acc[w] : 0) + (map[c] ? 0 : 1),
      }),
      {}
    );

  const getWord = (obj) => Object.keys(obj)[0];

  const getWordWithLeastUnkownRelative = (acc, w) => {
    const getCount = (obj) => Object.values(obj)[0];

    if (getWord(acc).length / getCount(acc) < getWord(w).length / getCount(w))
      return w;

    return acc;
  };

  const removeKownWords = (count) => Object.values(count)[0] !== 0;

  const wordsLeft = words.map(countUnkownChars).filter(removeKownWords);

  console.log(wordsLeft);

  const oneLetterWords = wordsLeft.find((w) => getWord(w).length === 1);
  if (oneLetterWords) return getWord(oneLetterWords);

  const DEFAULT = { xxxxx: 1000 };
  const diffCount = wordsLeft.reduce(getWordWithLeastUnkownRelative, DEFAULT);
  return diffCount === DEFAULT ? null : getWord(diffCount);
};

const cleanUpSentence = (word) =>
  word
    .toLowerCase()
    .replace(/'/gi, "")
    .replace(/[^0-9a-z]/gi, " ")
    .replace(/\s\s+/g, " ")
    .trim();

module.exports = {
  decodeWith,
  decypher,
  doubleLetters,
  getConversionMap,
  canBeAssigned,
  respectDoubleLetters,
  isUnique,
  noDupe,
  enrich,
  getWordsByLength,
  findBestNextWord,
  cleanUpSentence,
};
