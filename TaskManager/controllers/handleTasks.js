const { getData } = require("../../functions/getData");

const handleTasks = async (req, res) => {
  try {
    const bodydata = req.body;
    let query = ``;
    for (let i = 0; i < bodydata.length; i++) {
      bodydata[i]?.checked &&
        bodydata[i]?.checked === "false" &&
        (query += `INSERT INTO TaskManagerTasks (
        DateTime, 
        Category,
        Equipment_Type,
        Equipment_Model,
        Equipment,
        Title,
        Description,
        Status,
        ReportID) VALUES (
        )`);
    }
    if (query !== ``) {
      await getData(query);
    } else {
      throw new Error(`No Tasks Found`);
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleTasks };
