const { deleteData } = require("../../../services/mainService");

const deleteEquipmentsTransport = async (req, res) => {
  try {
    const result = await deleteData(req.params.id, "EquipmentsTransport");
    // const targetColVal = Object.values(req.params)[0];
    // const result = await tableDeleteData(`EquipmentsTransport`, targetColVal);
    return res.status(200).json({ success: "true", dataDeleted: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteEquipmentsTransport };
