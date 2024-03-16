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

const getAllMaintenance_Stocks = async (req, res) => {
  try {
    const data = await getAllData();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneMaintenance_Stocks = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await getOneData(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addOneMaintenance_Stocks = async (req, res) => {
  try {
    const data = await addData(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addManyMaintenance_Stocks = async (req, res) => {
  try {
    const data = await addMany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOneMaintenance_Stocks = async (req, res) => {
  try {
    const data = await updateData(req.body, req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateManyMaintenance_Stocks = async (req, res) => {
  try {
    const data = await updateMany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOneMaintenance_Stocks = async (req, res) => {
  try {
    const data = await deleteData(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteManyMaintenance_Stocks = async (req, res) => {
  try {
    const data = await deleteMany(req.body.ids);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMaintenance_Stocks,
  getOneMaintenance_Stocks,
  addOneMaintenance_Stocks,
  addManyMaintenance_Stocks,
  updateOneMaintenance_Stocks,
  updateManyMaintenance_Stocks,
  deleteOneMaintenance_Stocks,
  deleteManyMaintenance_Stocks,
};
