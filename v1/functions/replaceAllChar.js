const replaceAllChar = async (string, char1, char2) => {
  while (string.includes(char1)) {
    string = string.replace(char1, char2);
  }
  return string;
};

module.exports = { replaceAllChar };
