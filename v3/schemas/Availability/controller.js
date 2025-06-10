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

const getAllAvailability = async (req, res) => {
  try {
    const data = await getAllData();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneAvailability = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await getOneData(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addOneAvailability = async (req, res) => {
  try {
    const data = await addData(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addManyAvailability = async (req, res) => {
  try {
    const data = await addMany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOneAvailability = async (req, res) => {
  try {
    const data = await updateData(req.body, req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateManyAvailability = async (req, res) => {
  try {
    const data = await updateMany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOneAvailability = async (req, res) => {
  try {
    const data = await deleteData(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteManyAvailability = async (req, res) => {
  try {
    const data = await deleteMany(req.body.ids);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAvailability,
  getOneAvailability,
  addOneAvailability,
  addManyAvailability,
  updateOneAvailability,
  updateManyAvailability,
  deleteOneAvailability,
  deleteManyAvailability,
};
