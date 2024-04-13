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
} = require("./service");

const getAllKelly_Location = async (req, res) => {
  try {
    const data = await getAllData();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneKelly_Location = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await getOneData(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addOneKelly_Location = async (req, res) => {
  try {
    const data = await addData(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addManyKelly_Location = async (req, res) => {
  try {
    const data = await addMany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOneKelly_Location = async (req, res) => {
  try {
    const data = await updateData(req.body, req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateManyKelly_Location = async (req, res) => {
  try {
    const data = await updateMany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOneKelly_Location = async (req, res) => {
  try {
    const data = await deleteData(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteManyKelly_Location = async (req, res) => {
  try {
    const data = await deleteMany(req.body.ids);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllKelly_Location,
  getOneKelly_Location,
  addOneKelly_Location,
  addManyKelly_Location,
  updateOneKelly_Location,
  updateManyKelly_Location,
  deleteOneKelly_Location,
  deleteManyKelly_Location,
};
