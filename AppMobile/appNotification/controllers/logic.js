const { getData } = require("../../../functions/getData");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    let query = ``;
    if (fieldsData?.type === "newIssue") {
      query = `SELECT * FROM AppMaintUsers WHERE Location = '${fieldsData?.Location}' AND
                       Role <> 'Operator'`;
      let result = await getData(query);
      result = result.recordsets[0];
      for (let i = 0; i < result.length; i++) {
        let notQuery = `INSERT INTO AppMaintNotification VALUES(
                        GETDATE(),
                        '${fieldsData?.username}',
                        '${result[i]?.ProfileImg}',
                        '${result[i]?.UserName}',
                        '${fieldsData?.Equipment} Started New Problem ${fieldsData?.Breakdown_Type} at ${fieldsData?.Problem_start_From}',
                        'false',
                        'false'
        )`;
        await getData(notQuery);
      }
    } else if (fieldsData?.type === "endIssue") {
      query = `SELECT * FROM AppMaintUsers WHERE Location = '${fieldsData?.Location}' AND
                       Role = 'Operator' AND Equipment_Type = '${fieldsData?.Equipment_Type}'`;
      let result = await getData(query);
      result = result.recordsets[0];
      for (let i = 0; i < result.length; i++) {
        let notQuery = `INSERT INTO AppMaintNotification VALUES(
                        GETDATE(),
                        '${fieldsData?.username}',
                        '${result[i]?.ProfileImg}',
                        '${result[i]?.UserName}',
                        '${fieldsData?.Equipment} Started New Problem ${fieldsData?.Breakdown_Type} at ${fieldsData?.Problem_start_From}',
                        'false',
                        'false'
        )`;
        await getData(notQuery);
      }
    }
    return res.status(200).json({ success: "true" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
