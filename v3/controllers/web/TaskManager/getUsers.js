// const { getData } = require("../../../helpers/getData");
const { getAllData } = require("../../../services/mainService");

const getUsers = async (req, res) => {
  try {
    // const query = `SELECT * FROM AdminUsersApp WHERE Department = 'Maintenance' AND Title = 'Technicians'`;
    // const data = (await getData(query)).recordsets[0];
    const allUsers = await getAllData("AdminUsersApp");
    const data = allUsers.filter(
      (user) =>
        user.Department === "Maintenance" && user.Title === "Technicians"
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers };
