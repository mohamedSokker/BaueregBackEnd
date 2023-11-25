const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const Tesseract = require("tesseract.js");

const pdfPath = "/home/mohamed/bauereg/api/BST053_ShippingDocs.pdf";

const convertToPNG = async (pdfPath) => {
  const outputPath = "/home/mohamed/bauereg/pdfs"; // Change this to your desired output folder

  // Use pdftoppm to convert PDF to PNG images
  const { stdout, stderr } = await exec(
    `pdftoppm -png ${pdfPath} /home/mohamed/bauereg/pdfs/BST053_ShippingDocs`
  );

  if (stderr) {
    throw new Error(`Error converting PDF to PNG: ${stderr}`);
  }

  let count = 0;
  const imageFiles = fs.readdirSync(outputPath).map((file) => {
    return `${outputPath}/${file}`;
  });
  return imageFiles;
};

const extractTextFromImages = async (imagePaths) => {
  try {
    const textArray = await Promise.all(
      imagePaths.map(
        async (imagePath) =>
          (
            await Tesseract.recognize(imagePath, "eng", {
              preserve_interword_spaces: 1,
            })
          ).data.text
      )
    );

    // const textArray = await Tesseract.recognize(imagePaths[0], "eng", {
    //   logger: (e) => console.log(e),
    // });

    return textArray;
  } catch (error) {
    throw new Error(error.message);
  }
};

const pdfImage = async (req, res) => {
  try {
    const imagePaths = await convertToPNG(pdfPath);
    console.log(imagePaths);
    const textArray = await extractTextFromImages(imagePaths);
    // Optionally, you can clean up the temporary image files
    imagePaths.forEach((imagePath) => fs.unlinkSync(imagePath));
    res.status(200).json(textArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { pdfImage };
