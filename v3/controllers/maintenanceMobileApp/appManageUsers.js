// const { parseURL } = require("../../../v1/functions/parseURL");
// const { getData } = require("../../helpers/getData");
// const bcrypt = require("bcrypt");
const JSONStream = require("JSONStream");

const { getData } = require("../../helpers/getData");
const {
  // getAllData,
  getOneData,
  addData,
  updateData,
  deleteData,
} = require("../../services/mainService");
const { model } = require("../../model/mainModel");
const { AppMaintUsersSchema } = require("../../schemas/AppMaintUsers/schema");

const getAllmanageUsers = async (req, res) => {
  const jsonStream = JSONStream.stringify("[\n", "\n,\n", "\n]\n", 1024);

  // Pipe the large JSON object to the JSONStream serializer
  jsonStream.pipe(res);

  if (model["AppMaintUsers"]) {
    // Push the large JSON object into the JSONStream serializer
    for (let i = 0; i < model["AppMaintUsers"].length; i++) {
      jsonStream.write(model["AppMaintUsers"][i]);
    }

    // End the JSONStream serializer
    jsonStream.end();
  } else {
    getData("SELECT * FROM AppMaintUsers").then((result) => {
      for (let i = 0; i < result.recordsets[0].length; i++) {
        jsonStream.write(result.recordsets[0][i]);
      }

      // End the JSONStream serializer
      jsonStream.end();
    });
  }
};

const getmanageUsers = async (req, res) => {
  try {
    const result = await getOneData(req.params.id, "AppMaintUsers");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addmanageUsers = async (req, res) => {
  try {
    const result = await addData(
      req.body,
      "AppMaintUsers",
      AppMaintUsersSchema
    );
    return res.status(200).json({ success: "true", dataAdded: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatemanageUsers = async (req, res) => {
  try {
    const result = await updateData(
      req.body,
      req.params.id,
      "AppMaintUsers",
      AppMaintUsersSchema
    );
    return res.status(200).json({ success: "true", dataUpdated: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletemanageUsers = async (req, res) => {
  try {
    const result = await deleteData(req.params.id, "AppMaintUsers");
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllmanageUsers,
  getmanageUsers,
  addmanageUsers,
  updatemanageUsers,
  deletemanageUsers,
};
