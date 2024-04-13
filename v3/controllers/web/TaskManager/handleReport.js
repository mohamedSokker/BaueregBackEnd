// const { getData } = require("../../../helpers/getData");
const { addData } = require("../../../services/mainService");
const {
  TaskManagerReportsSchema,
} = require("../../../schemas/TaskManagerReports/schema");

const handleReport = async (req, res) => {
  try {
    const bodyData = req.body;
    const body = {
      DateTime: "Date.Now",
      Equipment_Type: bodyData.eqType,
      Equipment_Model: bodyData.eqModel,
      Equipment: bodyData.eq,
      ReportData: JSON.stringify(bodyData.selectedData),
      UserName: bodyData.UserName,
      UserImage: bodyData.UserImage,
      Status: "New",
      Sent: "false",
    };
    const data = await addData(
      body,
      "TaskManagerReports",
      TaskManagerReportsSchema
    );
    // const query = `INSERT INTO TaskManagerReports VALUES(
    //     GETDATE(),
    //     '${bodyData.eqType}',
    //     '${bodyData.eqModel}',
    //     '${bodyData.eq}',
    //     '${JSON.stringify(bodyData.selectedData)}',
    //     '${bodyData.userName}',
    //     '${bodyData.userImage}',
    //     'New',
    //     'false'
    // )`;
    // const data = await getData(query);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleReport };
