const nodeCache = require("node-cache");

const cache = new nodeCache();

module.exports = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    console.log(`cannot cache non-get method`);
    return next();
  }

  const key = req.originalUrl;
  const cachedRespone = cache.get(key);

  if (cachedRespone) {
    console.log(`cache hits for ${key}`);
    res.send(cachedRespone);
  } else {
    console.log(`cache missed for ${key}`);
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
    };
    next();
  }
};
