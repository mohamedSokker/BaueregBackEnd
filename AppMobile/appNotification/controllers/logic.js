const { getAllData, addMany } = require("../../../app/service");
const {
  AppMaintNotificationSchema,
} = require("../../../app/AppMaintNotification/schema");
// const { getData } = require("../../../functions/getData");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const bodyData = [];
    // let query = ``;
    const allUsersData = await getAllData("AppMaintUsers");
    console.log(`location: ${fieldsData?.Location}`);
    if (fieldsData?.type === "newIssue") {
      const result = allUsersData.filter((item) => {
        return (
          item.Location.includes(fieldsData?.Location) &&
          item.Role !== "Operator"
        );
      });
      // query = `SELECT * FROM AppMaintUsers WHERE Location LIKE '%${fieldsData?.Location}%' AND
      //                  Role <> 'Operator'`;
      // let result = await getData(query);
      // result = result.recordsets[0];
      for (let i = 0; i < result.length; i++) {
        bodyData.push({
          Date_Time: "Date.Now",
          FromUserName: fieldsData?.username,
          FromUserImg: fieldsData?.ProfileImg,
          ToUser: result[i]?.UserName,
          Body: `${fieldsData?.Equipment} Started New Problem ${fieldsData?.Breakdown_Type} at ${fieldsData?.Problem_start_From}`,
          Seen: "false",
          Sent: "false",
        });
        // let notQuery = `INSERT INTO AppMaintNotification VALUES(
        //                 GETDATE(),
        //                 '${fieldsData?.username}',
        //                 '${fieldsData?.ProfileImg}',
        //                 '${result[i]?.UserName}',
        //                 '${fieldsData?.Equipment} Started New Problem ${fieldsData?.Breakdown_Type} at ${fieldsData?.Problem_start_From}',
        //                 'false',
        //                 'false'
        // )`;
        // await getData(notQuery);
      }
    } else if (fieldsData?.type === "endIssue") {
      const result = allUsersData.filter((item) => {
        return (
          item.Location.includes(fieldsData?.Location) &&
          item.Role === "Operator" &&
          item.Equipment_Type === fieldsData?.Equipment_Type
        );
      });
      // query = `SELECT * FROM AppMaintUsers WHERE Location LIKE '%${fieldsData?.Location}%' AND
      //                  Role = 'Operator' AND Equipment_Type = '${fieldsData?.Equipment_Type}'`;
      // let result = await getData(query);
      // result = result.recordsets[0];
      for (let i = 0; i < result.length; i++) {
        bodyData.push({
          Date_Time: "Date.Now",
          FromUserName: fieldsData?.username,
          FromUserImg: fieldsData?.ProfileImg,
          ToUser: result[i]?.UserName,
          Body: `${fieldsData?.Equipment} Ended Problem ${fieldsData?.Breakdown_Type} at ${fieldsData?.problem_End_To}`,
          Seen: "false",
          Sent: "false",
        });
        // let notQuery = `INSERT INTO AppMaintNotification VALUES(
        //                 GETDATE(),
        //                 '${fieldsData?.username}',
        //                 '${fieldsData?.ProfileImg}',
        //                 '${result[i]?.UserName}',
        //                 '${fieldsData?.Equipment} Ended Problem ${fieldsData?.Breakdown_Type} at ${fieldsData?.problem_End_To}',
        //                 'false',
        //                 'false'
        // )`;
        // await getData(notQuery);
      }
    }
    console.log(bodyData);
    await addMany(bodyData, "AppMaintNotification", AppMaintNotificationSchema);
    return res.status(200).json({ success: "true" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
