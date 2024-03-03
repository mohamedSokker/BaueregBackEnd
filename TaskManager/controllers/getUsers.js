const { getData } = require("../../functions/getData");

const getUsers = async (req, res) => {
  try {
    const query = `SELECT * FROM AdminUsersApp WHERE Department = 'Maintenance' AND Title = 'Technicians'`;
    const data = (await getData(query)).recordsets[0];
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers };
