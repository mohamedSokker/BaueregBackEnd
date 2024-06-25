const fs = require("fs");
const path = require("path");
const pdfDoc = require("pdf-lib");
const pdf = require("pdf-parse");

const Analyze = async (req, res) => {
  try {
    const basePath = req.body.path;
    const path = `/home/mohamed/bauereg/OilSamples/Bauer${basePath}`;
    // const path = req.query.filepath;
    const targetpath = `${process.env.BASE_PATH}/OilSamplesAnalyzed/Bauer`;
    // const targetfileName = req.query.targetfilename;
    const KeyWords = ["HYDRAULIC CIRCUITS /", "GEARBOX /", "DIESEL ENGINES /"];
    const docAsBytes = await fs.promises.readFile(path);
    const pdfDocument = await pdfDoc.PDFDocument.load(docAsBytes);
    const noOfPages = pdfDocument.getPages().length;
    let subDoc;
    let count = 1;
    let currentTool = "";
    let currentCat = "";
    let prevTool = "";
    let prevCat = "";
    let pdfBytes;
    let readpdfText = "";
    let pdfText = "";
    let prevpdfText = "";
    let targetfilename = "";
    let targetdate = "";
    let data = [];
    for (let i = 0; i < noOfPages; i++) {
      prevTool = currentTool;
      prevCat = currentCat;
      const readDoc = await pdfDoc.PDFDocument.create();
      const [currentPage] = await readDoc.copyPages(pdfDocument, [i]);
      readDoc.addPage(currentPage);
      const readpdfBytes = await readDoc.save();
      const readText = await pdf(readpdfBytes);
      pdfText = readText.text;

      let flag = false;
      KeyWords.map((keyword) => {
        if (pdfText.includes(keyword) && pdfText.includes("Diagnosis date:")) {
          const startText = pdfText.indexOf(keyword);
          const endText = pdfText.indexOf("\n", startText + 1);
          let textArray = pdfText.slice(startText, endText).split("/");
          console.log(startText, endText, textArray);
          currentTool = textArray[textArray.length - 1].trim();
          if (pdfText.includes("DISTRIBUTOR GEARBOX")) {
            currentCat = "DISTRIBUTOR GEARBOX";
            keyword.trim(" /");
          } else {
            currentCat = keyword.trim(" /");
          }

          flag = true;

          return true;
        }
      });
      if (!flag) {
        currentTool = "";
      }
      // console.log(currentTool);

      if (i === 0 || currentTool !== prevTool) {
        if (pdfBytes !== undefined && prevTool !== "") {
          // const startText = prevpdfText.indexOf(prevTool);
          // const endText = prevpdfText.indexOf("\n", startText + 1);
          // let textArray = prevpdfText.slice(startText, endText).split("/");
          // targetfilename = textArray[textArray.length - 1].trim();
          targetfilename = prevTool;
          const startDate = prevpdfText.indexOf("Diagnosis date:");
          const endDate = prevpdfText.indexOf("\n", startDate + 1);
          let dateArray = prevpdfText.slice(startDate, endDate).split(":");
          targetdate = dateArray[dateArray.length - 1].trim();

          if (!fs.existsSync(`${targetpath}/${prevCat}`)) {
            fs.mkdirSync(`${targetpath}/${prevCat}`);
          }
          if (!fs.existsSync(`${targetpath}/${prevCat}/${prevTool}`)) {
            fs.mkdirSync(`${targetpath}/${prevCat}/${prevTool}`);
          }
          if (
            !fs.existsSync(`${targetpath}/${prevCat}/${prevTool}/${targetdate}`)
          ) {
            fs.mkdirSync(`${targetpath}/${prevCat}/${prevTool}/${targetdate}`);
          }
          await fs.promises.writeFile(
            `${targetpath}/${prevCat}/${prevTool}/${targetdate}/${targetfilename}.pdf`,
            pdfBytes
          );
          count++;
        }
        subDoc = await pdfDoc.PDFDocument.create();
      }

      const [copiedPage] = await subDoc.copyPages(pdfDocument, [i]);
      subDoc.addPage(copiedPage);
      pdfBytes = await subDoc.save();
      readpdfText = await pdf(pdfBytes);
      prevpdfText = readpdfText.text;
      data.push({
        text: pdfText,
        currentTool,
        currentCat,
        targetfilename,
        prevTool,
        prevCat,
        targetdate,
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { Analyze };
