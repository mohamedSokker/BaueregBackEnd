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

const getAllTest = async (req, res) => {
  try {
    const data = await getAllData();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneTest = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await getOneData(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addOneTest = async (req, res) => {
  try {
    const data = await addData(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addManyTest = async (req, res) => {
  try {
    const data = await addMany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOneTest = async (req, res) => {
  try {
    const data = await updateData(req.body, req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateManyTest = async (req, res) => {
  try {
    const data = await updateMany(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOneTest = async (req, res) => {
  try {
    const data = await deleteData(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteManyTest = async (req, res) => {
  try {
    const data = await deleteMany(req.body.ids);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTest,
  getOneTest,
  addOneTest,
  addManyTest,
  updateOneTest,
  updateManyTest,
  deleteOneTest,
  deleteManyTest,
};
