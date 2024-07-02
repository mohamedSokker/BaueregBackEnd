const sheerToJson = (data) => {
  try {
    delete data?.["!ref"];
    delete data?.["!autofilter"];
    delete data?.["!margins"];
    const arrayData = Object.keys(data);
    const result = [];
    let object = {};
    let count = 2;
    arrayData.map((item) => {
      //   console.log(`item => ${item.slice(1)}`);
      //   console.log(`count => ${count}`);
      if (item.slice(1) != count && item.slice(1) != "1") {
        result.push(object);
        count++;
        object = {};
      }
      if (item.slice(1) != "1") {
        object = {
          ...object,
          [data[`${item.slice(0, 1)}1`]?.v]: data[item]?.v,
        };
      }
    });

    result.push(object);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { sheerToJson };
