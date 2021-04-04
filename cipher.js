const { decypher } = require("./utils");

const getRandomMapping = () => {
  let i = 0;
  const map = {};
  const a = "a".charCodeAt(0);
  while (i < 26) {
    const charCode = Math.floor(Math.random() * 26);
    const char = String.fromCharCode(a + charCode);
    if (Object.values(map).includes(char)) continue;

    map[String.fromCharCode(a + i)] = char;
    i++;
  }
  return map;
};

cipherString = (string) => {
  const map = getRandomMapping();
  return { map, cipher: decypher(string, map) };
};

module.exports = cipherString;
