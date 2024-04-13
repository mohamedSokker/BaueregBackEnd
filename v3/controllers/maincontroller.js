const {
  createTable,
  getAllData,
  getOneData,
  addData,
  addMany,
  updateData,
  updateMany,
  deleteData,
  deleteMany,
} = require("../services/mainService");

const getAllTable = async (req, res) => {
  try {
    const data = await getAllData(req.table);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneTable = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await getOneData(req.params.id, req.table);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addOneTable = async (req, res) => {
  try {
    const data = await addData(req.body, req.table, req.schema);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addManyTable = async (req, res) => {
  try {
    const data = await addMany(req.body, req.table, req.schema);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOneTable = async (req, res) => {
  try {
    const data = await updateData(
      req.body,
      req.params.id,
      req.table,
      req.schema
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateManyTable = async (req, res) => {
  try {
    const data = await updateMany(req.body, req.table, req.schema);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOneTable = async (req, res) => {
  try {
    const data = await deleteData(req.params.id, req.table);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteManyTable = async (req, res) => {
  try {
    const data = await deleteMany(req.body.ids, req.table);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTable,
  getOneTable,
  addOneTable,
  addManyTable,
  updateOneTable,
  updateManyTable,
  deleteOneTable,
  deleteManyTable,
};
