const { model } = require("../../../model/mainModel");

const regix = {
  int: /^[0-9]*$/,
  intEmpty: /^$|^[0-9]*$/,
  date: /^(?:\d{4}-\d{2}-\d{2})$/,
  dateEmty: /^$|^(?:\d{4}-\d{2}-\d{2})$/,
  dateTime:
    /^(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(.\d{3})?|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z))$/,
  dateTimeOrNull:
    /^(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(.\d{3})?|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z))$/,
  nvarChar255: /^.{0,255}$/,
  nvarchar255Empty: /^$|^.{0,255}$/,
  decimal81: /^\d{1,7}(\.\d{1})?$/,
  decimal82: /^\d{1,7}(\.\d{2})?$/,
  text: /^[a-zA-Z0-9 :,"{}[\]]*$/,
};

const validateData = async (data, tools, sites, eqs) => {
  let flag = true;
  let message = ``;
  const lastID =
    model["EqsToolsLocation"][model["EqsToolsLocation"].length - 1];
  // console.log(lastID?.ID);
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].ID);
    if (lastID?.ID && Number(data[i].ID) <= Number(lastID?.ID)) {
      flag = false;
      message = `this ID is found once in database in row ${i + 2}`;
      break;
    }
    if (!tools.includes(data[i].Type)) {
      flag = false;
      message = `Type is not included in row ${i + 2}`;
      break;
    }
    if (!regix.nvarChar255.test(data[i].Code)) {
      flag = false;
      message = `Code is not matching nvar255 in row ${i + 2}`;
      break;
    }
    if (!regix.nvarchar255Empty.test(data[i].Serial)) {
      flag = false;
      message = `Serial is not matching nvar255empty in row ${i + 2}`;
      break;
    }
    if (!regix.date.test(data[i].Start_Date)) {
      flag = false;
      message = `Start Date is not matching date in row ${i + 2}`;
      break;
    }
    if (
      !regix.dateEmty.test(data[i].End_Date && data[i].End_Date !== "Date.Now")
    ) {
      flag = false;
      message = `End Date is not matching date in row ${i + 2}`;
      break;
    }
    if (!regix.int.test(data[i].Start_WH)) {
      flag = false;
      message = `Start WH is not matching int in row ${i + 2}`;
      break;
    }
    if (!regix.intEmpty.test(data[i].End_WH)) {
      flag = false;
      message = `End WH is not matching int in row ${i + 2}`;
      break;
    }
    if (!sites.includes(data[i].Location)) {
      flag = false;
      message = `Location is not included in row ${i + 2}`;
      break;
    }
    if (!eqs.includes(data[i].Equipment)) {
      flag = false;
      message = `Equipment is not included in row ${i + 2}`;
      break;
    }
  }

  return { flag, message };
};

module.exports = { validateData };
