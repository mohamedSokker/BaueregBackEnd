const fs = require("fs");
const pdfDoc = require("pdf-lib").PDFDocument;

const pdfLibRead = async (req, res) => {
  const path = req.query.filepath;
  const targetpath = req.query.path;
  const targetfileName = req.query.targetfilename;
  const docAsBytes = await fs.promises.readFile(path);
  const pdfDocument = await pdfDoc.load(docAsBytes);
  const subDoc = await pdfDoc.create();
  const [copiedPage] = await subDoc.copyPages(pdfDocument, [0]);
  subDoc.addPage(copiedPage);
  const pdfBytes = await subDoc.save();
  await fs.promises.writeFile(`${targetpath}/${targetfileName}.pdf`, pdfBytes);
  res.status(200).send({ docAsBytes: docAsBytes, copiedPage: copiedPage });
};

module.exports = { pdfLibRead };
