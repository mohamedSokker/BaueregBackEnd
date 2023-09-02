const { replaceAllChar } = require("./replaceAllChar");

const parseURL = async (query) => {
  query = await replaceAllChar(query, "%20", " ");
  query = await replaceAllChar(query, "%23", "#");
  query = await replaceAllChar(query, "%26", "&");
  query = await replaceAllChar(query, "%25", "%");
  query = await replaceAllChar(query, "%22", '"');
  query = await replaceAllChar(query, "%28", "(");
  query = await replaceAllChar(query, "%29", ")");
  return query;
};

module.exports = { parseURL };
