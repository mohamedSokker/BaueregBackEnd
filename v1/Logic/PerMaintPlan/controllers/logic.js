const xlsx = require("xlsx");

const { getData } = require("../../../../v3/helpers/getData");
const addHours = require("../../globalFunction/addHours");

const path = `${__dirname}/PeriodicMaint/PeriodicMaint.xlsx`;

const readExcel = async (sheet) => {
  try {
    const workbook = xlsx.readFile(path);

    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
    let data = {};
    jsonData.map((d) => {
      data = data[d.Title]
        ? {
            ...data,
            [d.Title]: [...data[d.Title], { Task: d.Task, OilType: d.OilType }],
          }
        : { ...data, [d.Title]: [{ Task: d.Task, OilType: d.OilType }] };

      return data;
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getInterval = (firstReg, secondReg) => {
  if (firstReg === 3 && secondReg === 0) {
    return "1000";
  } else if (firstReg === 3 && secondReg === 1) {
    return "2000";
  } else {
    return "250";
  }
};

const getSheet = (interval, Equipment_Model) => {
  if (Equipment_Model.startsWith("MC")) {
    return `MC${interval}`;
  } else if (Equipment_Model.startsWith("BC")) {
    return `BC${interval}`;
  } else if (Equipment_Model.startsWith("BG")) {
    return `BG${interval}`;
  } else {
    throw new Error(`No Model Found`);
  }
};

const getDuration = { 250: 2, 1000: 4, 2000: 5 };

const getEquipmentDetails = async (eq, year) => {
  const query = `SELECT Top 1
                 Location,
                 Equipment_Type,
                 Equipment
                 FROM PerMaint
                 WHERE
                 Year = '${year}' AND
                 Equipment = '${eq}'`;
  const result = await getData(query);
  return result.recordsets[0];
};

const getDate = (date) => {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString();
};

const getNextRegions = (firstReg, secondReg) => {
  if (secondReg === 1 && firstReg === 3) {
    firstReg = 0;
    secondReg = 0;
  } else if (secondReg === 0 && firstReg === 3) {
    firstReg = 0;
    secondReg = 1;
  } else {
    firstReg++;
  }
  return { firstReg, secondReg };
};

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const eqsDetails = await getEquipmentDetails(
      fieldsData.Equipment,
      fieldsData.Year
    );
    let query = ``;
    if (eqsDetails.length > 0)
      throw new Error(`Interval already exist for this Equipment`);

    let startDate = `${fieldsData.Year.toString()}-01-01 00:00:00`;
    let data = [];
    let interval = "250";
    let firstReg = 0;
    let secondReg = 0;
    while (
      new Date(startDate) <
      new Date(`${fieldsData.Year.toString()}-12-31 23:59:59`)
    ) {
      interval = getInterval(firstReg, secondReg);
      const sheet = getSheet(interval, fieldsData.Equipment_Model);
      const Tasks_Unperformed = JSON.stringify(await readExcel(sheet));
      data.push({
        year: fieldsData.Year,
        Location: fieldsData?.Location,
        Equipment_Type: fieldsData.Equipment_Type,
        Equipment_Model: fieldsData?.Equipment_Model,
        Equipment: fieldsData.Equipment,
        TimeStart: new Date(getDate(startDate)),
        TimeEnd: new Date(getDate(addHours(startDate, getDuration[interval]))),
        duration: getDuration[interval],
        ExpectedOrActualNextDate: new Date(
          getDate(addHours(startDate, 300 + getDuration[interval]))
        ),
        Tasks_Unperformed,
        Type: `Plan`,
        firstReg,
        secondReg,
        interval,
      });
      startDate = addHours(startDate, 300 + getDuration[interval]);
      const regions = getNextRegions(firstReg, secondReg);
      firstReg = regions.firstReg;
      secondReg = regions.secondReg;
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
