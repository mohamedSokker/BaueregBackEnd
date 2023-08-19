const fs = require("fs");
const pdf = require("pdf-parse");

const pdfParse = (req, res) => {
  const path = req.query.path;
  let dataBuffer = fs.readFileSync(path);

  pdf(dataBuffer)
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => console.log(error));
};

module.exports = { pdfParse };
