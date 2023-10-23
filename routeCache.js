const nodeCache = require("node-cache");

const cache = new nodeCache();
const duration = 600;

module.exports = (updateKey) => (req, res, next) => {
  //   if (req.method !== "GET") {
  //     console.log(`cannot cache non-get method`);
  //     return next();
  //   }

  //   const key = req.originalUrl;
  let key = ``;
  let fieldsData = { ...req.body };
  if (fieldsData) {
    key += `${fieldsData?.usersData ? fieldsData?.usersData[0]?.username : ""}`;
    // console.log(`${fieldsData.usersData[0].username}`);
    delete fieldsData.usersData;
    key += ` ${Object.values(fieldsData).join(" ")} ${req.originalUrl}`;
    // console.log(Object.values(fieldsData).join(" "));
  } else {
    key = req.originalUrl;
  }
  const cachedRespone = cache.get(key);
  const updateRequired = cache.get(updateKey);
  console.log(typeof updateRequired);

  if (cachedRespone && updateRequired === false) {
    console.log(`cache hits for ${key}`);
    console.log(`cache hits for ${updateKey}`);
    res.send(cachedRespone);
  } else {
    console.log(`cache missed for ${key}`);
    console.log(`cache missed for ${updateKey}`);
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
      cache.set(updateKey, false, duration);
    };
    next();
  }
};
