const tableDeleteData = require("../../Logic/tablesData/tableDeleteData");

const deleteEquipmentsTransport = async (req, res) => {
  try {
    const targetColVal = Object.values(req.params)[0];
    const result = await tableDeleteData(`EquipmentsTransport`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteEquipmentsTransport };
