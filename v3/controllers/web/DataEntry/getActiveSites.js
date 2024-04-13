// const { getData } = require("../../../helpers/getData");
const { getAllData } = require("../../../services/mainService");

const getActiveSites = async (req, res) => {
  try {
    const fieldsData = req.body;
    // const query = `SELECT
    // Equipments_Location.Location,
    // Equipments_Location.Equipment_Type,
    // Bauer_Equipments.Equipment_Model,
    // Equipments_Location.Equipment
    // FROM Equipments_Location
    // JOIN Bauer_Equipments
    // ON (Equipments_Location.Equipment = Bauer_Equipments.Equipment)
    // WHERE Equipments_Location.End_Date IS NULL`;
    // const usersQuery = `SELECT Top 1
    // Locations FROM Users
    // WHERE UserName = '${fieldsData?.username}'`;
    // const result = await getData(`${query} ${usersQuery}`);
    // const sitesResult = result?.recordsets[0];
    // const usersResult = result.recordsets[1];

    const allEqsLoc = await getAllData("Equipments_Location");
    const allEqs = await getAllData("Bauer_Equipments");
    const allUsers = await getAllData("AdminUsersApp");
    const allBreakdownTypes = await getAllData("Bauer_Breakdown");

    const targetEqsLoc = allEqsLoc.filter((eq) => eq.End_Date === null);

    let allSitesEqs = [];
    targetEqsLoc.map((item) => {
      const eqModel = allEqs.find((eq) => eq.Equipment === item.Equipment);
      allSitesEqs.push({ ...item, Equipment_Model: eqModel?.Equipment_Model });
    });

    const targetUser = allUsers.find(
      (user) => user.UserName === fieldsData?.username
    );

    console.log(targetUser);

    const targetRole = JSON.parse(targetUser?.UserRole);

    let targetSites = [];
    if (targetRole.Admin) {
      targetEqsLoc.map((item) => {
        targetSites.push(item.Location);
      });
    } else {
      targetRole?.Editor?.DataEntrySites.map((site) => {
        targetSites.push(site.name);
      });
    }

    // const targetSites = targetRole?.Editor?.DataEntrySites;

    const sitesResult = allSitesEqs;
    const usersResult = targetSites.join(",");

    // console.log(sitesResult);
    console.log(targetSites);
    console.log(usersResult);

    if (!targetSites) throw new Error(`No Users Found`);

    return res
      .status(200)
      .json({ sitesResult, usersResult, allBreakdownTypes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveSites };
