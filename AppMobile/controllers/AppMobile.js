const sql = require("mssql");
const config = require("../../configApp");
const configUser = require("../../configAppUser");

const AppMobile = async (req, res) => {
  try {
    const query = `SELECT
                   Actions.Description,
                   Actions.CreatedDate As ActionsCreatedDate,
                   Actions.CreatedBy As ActionsCreatedBy,
                   Issues.CreatedDate AS IssuesCreatedDate,
                   Issues.ResponseTime,
                   Issues.StartMaintenanceTime As StartTime,
                   Issues.EndTime,
                   Issues.CreatedBy AS IssuesCreatedBy,
                   Equipment.Name AS Equipment,
                   Equipment.Model AS EquipmentModel,
                   EquipmentTypes.Name AS EquipmentType,
                   Projects.Name AS Location,
                   SpareParts.Code
                   FROM Actions
                   JOIN Issues
                   ON (Actions.IssueId = Issues.Id)
                   JOIN Equipment
                   ON (Issues.EquipmentId = Equipment.Id)
                   JOIN EquipmentTypes
                   ON (Equipment.EquipmentTypeId = EquipmentTypes.Id)
                   JOIN Projects
                   ON (Equipment.ProjectId = Projects.Id)
                   LEFT JOIN SpareParts
                   ON (SpareParts.IssueId = Issues.Id)`;
    const queryUser = `SELECT 
                   AspNetUsers.Id,
                   AspNetUsers.FirstName, 
                   AspNetUsers.LastName,
                   AspNetRoles.Name AS Role
                   FROM AspNetUsers
                   JOIN AspNetUserRoles
                   ON (AspNetUsers.Id = AspNetUserRoles.UserId)
                   JOIN AspNetRoles
                   ON (AspNetRoles.Id = AspNetUserRoles.RoleId)`;
    const dataConn = await sql.connect(config);
    const result = await sql.query(query);
    await dataConn.close();
    if (result.rowsAffected[0] === 0) throw new Error(`No Data`);
    const userConn = await sql.connect(configUser);
    const userResults = await sql.query(queryUser);
    await userConn.close();
    if (userResults.rowsAffected[0] === 0) throw new Error(`No User Data`);
    let data = [];
    let tableData = result.recordsets[0];
    let userData = userResults.recordsets[0];
    for (let i = 0; i < tableData.length; i++) {
      let IssueCreatedBy = "";
      const IssueUserName = userData.find(
        (user) => user.Id === tableData[i].IssuesCreatedBy
      );
      const ActionUserName = userData.find(
        (user) => user.Id === tableData[i].ActionsCreatedBy
      );
      //   data.push({
      //     IssueUserName: IssueUserName,
      //     ActionUserName: ActionUserName,
      //     tableData: tableData[i],
      //   });
      data.push({
        IssuesCreatedDate: tableData[i].IssuesCreatedDate,
        IssuesCreatedBy: `${IssueUserName.FirstName} ${IssueUserName.LastName}`,
        Location: tableData[i].Location,
        EquipmentType: tableData[i].EquipmentType,
        EquipmentModel: tableData[i].EquipmentModel,
        Equipment: tableData[i].Equipment,
        ResponseTime: tableData[i].ResponseTime,
        StartTime: tableData[i].StartTime,
        EndTime: tableData[i].EndTime,
        SparePart: tableData[i].Code,
        ActionCreatedBy: `${ActionUserName?.FirstName} ${ActionUserName?.LastName}`,
        ActionsCreatedDate: tableData[i].ActionsCreatedDate,
        ActionDescription: tableData[i].Description,
      });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { AppMobile };
