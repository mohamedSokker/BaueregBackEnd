// const { getData } = require("../../../v3/helpers/getData");
const { transporter } = require("../../../config/mailConfig");
const { getAllData, updateData } = require("../../../services/mainService");
const {
  EquipmentsTransportSchema,
} = require("../../../schemas/EquipmentsTransport/schema");

const editEqsTrans = async (req, res) => {
  try {
    const bodyData = req.body;

    let emailArray = [];
    // const usersQuery = `SELECT * FROM AdminUsersApp`;
    // const data = await getData(usersQuery);
    // const allUsers = data.recordsets[0];
    const allUsers = await getAllData("AdminUsersApp");

    const civilUsers = allUsers.filter(
      (user) => user.Title === "Manager" && user.Department === "Civil"
    );

    const maintUsers = allUsers.filter(
      (user) => user.Title === "Manager" && user.Department === "Maintenance"
    );

    const actualUsers = allUsers.filter(
      (user) => user.Title === "Office" && user.Department === "Transporter"
    );

    const id = Object.values(req.params)[0];

    if (bodyData?.UserGroup === "Civil") {
      civilUsers.map((user) => {
        if (user.UserName !== bodyData.username) {
          emailArray.push(user.Email);
        }
      });
    } else if (bodyData?.UserGroup === "Maintenance") {
      civilUsers.concat(maintUsers).map((user) => {
        if (user.UserName !== bodyData.username) {
          emailArray.push(user.Email);
        }
      });
    } else {
      actualUsers.concat(civilUsers, maintUsers).map((user) => {
        if (user.UserName !== bodyData.username) {
          emailArray.push(user.Email);
        }
      });
    }

    // const query = `UPDATE EquipmentsTransport SET
    //              StartDate = '${bodyData.StartDate}',
    //              EndDate = '${bodyData.EndDate}',
    //              Confirmed = '${JSON.stringify([bodyData?.username])}',
    //              Status = 'UnConfirmed',
    //              UserGroup = 'Civil'
    //              WHERE ID = '${id}' `;
    // await getData(query);
    await updateData(
      {
        StartDate: bodyData.StartDate,
        EndDate: bodyData.EndDate,
        Confirmed: JSON.stringify([bodyData?.username]),
        Status: "UnConfirmed",
        UserGroup: "Civil",
      },
      id,
      "EquipmentsTransport",
      EquipmentsTransportSchema
    );

    const mailOptions = {
      from: { name: "Bauer", address: process.env.GMAIL_EMAIL },
      to: emailArray,
      subject: "Edit Transportation",
      text: `${bodyData.username} Has Edited Tranport for Equipment ${bodyData.Equipment} Transport from site ${bodyData.FromLocation} to site ${bodyData.ToLocation} in an interval of ${bodyData.StartDate} to ${bodyData.EndDate}\n
Please Visit link to Confirm: https://bauereg.onrender.com/Transportations`,
    };
    if (emailArray && emailArray.length > 0)
      await transporter.sendMail(mailOptions);
    const result = {
      ...bodyData,
      ID: id,
      Confirmed: JSON.stringify([bodyData?.username]),
      Status: "UnConfirmed",
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { editEqsTrans };
