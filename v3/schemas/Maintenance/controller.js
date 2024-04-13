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

const getAllMaintenance = async (req, res) => {
  try {
    const data = await getAllData();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneMaintenance = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await getOneData(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addOneMaintenance = async (req, res) => {
  try {
    const data = await addData(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addManyMaintenance = async (req, res) => {
  try {
    const data = await addMany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOneMaintenance = async (req, res) => {
  try {
    const data = await updateData(req.body, req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateManyMaintenance = async (req, res) => {
  try {
    const data = await updateMany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOneMaintenance = async (req, res) => {
  try {
    const data = await deleteData(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteManyMaintenance = async (req, res) => {
  try {
    const data = await deleteMany(req.body.ids);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMaintenance,
  getOneMaintenance,
  addOneMaintenance,
  addManyMaintenance,
  updateOneMaintenance,
  updateManyMaintenance,
  deleteOneMaintenance,
  deleteManyMaintenance,
};
