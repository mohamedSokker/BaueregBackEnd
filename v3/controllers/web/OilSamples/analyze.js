const fs = require("fs");
const path = require("path");
const pdfDoc = require("pdf-lib");
const pdf = require("pdf-parse");

const { model } = require("../../../model/mainModel");
const { addMany, addManyQuery } = require("../../../services/mainService");
const { OilSamplesSchema } = require("../../../schemas/OilSamples/schema");

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
    let pageDate;
    let pageEq;
    let eqType;
    let category;
    let type;
    let resultComments;
    let prevDate;
    let oilType;
    let sampleResult;
    let site;
    for (let i = 0; i < noOfPages; i++) {
      prevTool = currentTool;
      prevCat = currentCat;
      prevDate = pageDate;
      const readDoc = await pdfDoc.PDFDocument.create();
      const [currentPage] = await readDoc.copyPages(pdfDocument, [i]);
      readDoc.addPage(currentPage);
      const readpdfBytes = await readDoc.save();
      const readText = await pdf(readpdfBytes);
      pdfText = readText.text;

      const stringPdfText = JSON.stringify(pdfText);

      // console.log(category, type);

      let flag = false;
      KeyWords.map((keyword) => {
        if (pdfText.includes(keyword) && pdfText.includes("Diagnosis date:")) {
          const startText = pdfText.indexOf(keyword);
          const endText = pdfText.indexOf("\n", startText + 1);
          let textArray = pdfText.slice(startText, endText).split("/");
          // console.log(startText, endText, textArray);
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

      if (pdfText.includes("Diagnosis date:")) {
        // const pageDaterx = /Diagnosis date: [0-9]{1,2} [a-z]+ [0-9]{3,4}/g;
        const pageDaterx = /[0-9]+-[A-Za-z]+-[0-9]+/g;
        if (stringPdfText.match(pageDaterx)) {
          pageDate = stringPdfText
            .match(pageDaterx)
            [stringPdfText.match(pageDaterx).length - 1]?.trim();
        }

        const eqrx = /[BG|BC|MC]+[0-9A-Z]+?\s?[0-9A-Z]+\s?#[0-9]+/g;
        pageEq = stringPdfText.match(eqrx) && stringPdfText.match(eqrx)[0];

        const eqName = pageEq?.split("#")[0]?.trim().split(" ").join("");
        const eqSerial = pageEq?.split("#")[1]?.trim();

        site = model["Equipments_Location"].find(
          (item) =>
            item.End_Date === null &&
            (eqName ===
              item.Equipment?.split("#")[0]?.trim().split(" ").join("") ||
              item.Equipment?.split("#")[0]?.trim()?.includes(eqName) ||
              eqName?.includes(
                item.Equipment?.split("#")[0]?.trim().split(" ").join("")
              )) &&
            eqSerial === item.Equipment?.split("#")[1]?.trim()
        )?.Location;

        if (!site) {
          site = model["Equipments_Location"].find(
            (item) =>
              item.End_Date === null &&
              eqSerial === item.Equipment?.split("#")[1]?.trim()
          )?.Location;
        }

        if (pageEq) {
          if (pageEq.startsWith("BC") || pageEq.startsWith("MC")) {
            eqType = "Trench Cutting Machine";
          } else {
            eqType = "Drilling Machine";
          }
        }

        const categoryrx = /[a-zA-Z]{5,}: (.*?)(\\n|$)/g;
        const categoryArray =
          stringPdfText.match(categoryrx) &&
          stringPdfText.match(categoryrx).length > 1 &&
          stringPdfText.match(categoryrx)[1];
        const categoryString = categoryArray && categoryArray.split("/");

        category = categoryString && categoryString[categoryString.length - 2];
        type = categoryString && categoryString[categoryString.length - 1];

        const commentsrx = /[A-Z][a-zA-Z \\;,\(\)]{6,}\./g;
        const comments = stringPdfText.match(commentsrx);

        resultComments = [];
        comments?.map((comment) => {
          if (comment.split("\\n").length <= 4) {
            // console.log(comment.split("\\n"));
            resultComments.push(comment);
          }
        });

        const oilTyperx = /[Oil]+ : [A-Z][a-zA-Z0-9 ]+/g;
        oilType =
          stringPdfText.match(oilTyperx) &&
          stringPdfText.match(oilTyperx)[0]?.split(":")[1].trim();
      }

      if (i === 0 || currentTool !== prevTool || pageDate !== prevDate) {
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
            !fs.existsSync(`${targetpath}/${prevCat}/${prevTool}/${prevDate}`)
          ) {
            fs.mkdirSync(`${targetpath}/${prevCat}/${prevTool}/${prevDate}`);
          }
          await fs.promises.writeFile(
            `${targetpath}/${prevCat}/${prevTool}/${prevDate}/${targetfilename}.pdf`,
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
      if (
        pageEq &&
        pageDate &&
        pdfText.includes("Diagnosis date:") &&
        (pdfText.includes("Sampling date") || pdfText.includes("Sample date"))
      ) {
        data.push({
          Date: pageDate,
          Category: pdfText.includes("DISTRIBUTOR GEARBOX")
            ? "DISTRIBUTOR GEARBOX"
            : category?.trim()?.split(":")[
                category?.trim()?.split(":")?.length - 1
              ],
          Serial: type?.replace("\\n", ""),
          OilType: oilType ? oilType : "",
          Equipment: pageEq,
          Location: site,
          Equipment_Type: eqType,
          SampleResult:
            resultComments?.join(",").includes("too high") ||
            resultComments?.join(",").includes("too low")
              ? "High"
              : resultComments?.join(",").includes("Abnormal") ||
                resultComments?.join(",").includes("slightly low") ||
                resultComments?.join(",").includes("slightly high") ||
                resultComments?.join(",").includes("intermediate")
              ? "Moderate"
              : "Ok",
          Comment: resultComments?.join(",").split("\\n").join(" "),
          URL: `${targetpath}/${currentCat}/${currentTool}/${pageDate}/${currentTool}.pdf`
            .replace("/home/mohamed", process.env.BASE_URL)
            .split("#")
            .join("%23")
            .split(" ")
            .join("%20")
            .trim(),
        });
      }
    }
    const result = await addMany(data, "OilSamples", OilSamplesSchema);
    return res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { Analyze };
