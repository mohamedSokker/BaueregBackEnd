const { getData } = require("../../functions/getData");
const { transporter } = require("../../config/mailConfig");

// const civilTransportUsers = ["Eng Sokker", "Eng Bahaa"];
// const maintTransportUsers = ["Eng Wael Khalil"];
// const actualTransportUser = ["Waleed"];

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    console.log(fieldsData);
    let emailArray = [];
    if (!fieldsData?.StartDate || !fieldsData.EndDate)
      return res
        .status(500)
        .json({ message: `Start Date Or End Date Can't be empty` });

    const eqsTransQuery = `SELECT * FROM EquipmentsTransport 
                           WHERE ToLocation = '${fieldsData?.ToLocation}' 
                           AND Equipment = '${fieldsData?.Equipment}'
                           AND Status = 'UnConfirmed'`;
    const usersQuery = `SELECT * FROM AdminUsersApp`;
    const data = await getData(`${eqsTransQuery} ${usersQuery}`);
    const eqsTransData = data.recordsets[0];
    const allUsers = data.recordsets[1];
    const civilUsers = allUsers.filter(
      (user) => user.Title === "Manager" && user.Department === "Civil"
    );

    const maintUsers = allUsers.filter(
      (user) => user.Title === "Manager" && user.Department === "Maintenance"
    );

    const actualUsers = allUsers.filter(
      (user) => user.Title === "Office" && user.Department === "Transporter"
    );

    let civilTransportUsers = [];
    let maintTransportUsers = [];
    let actualTransportUser = [];

    civilUsers.map((user) => {
      civilTransportUsers.push(user.UserName);
    });
    maintUsers.map((user) => {
      maintTransportUsers.push(user.UserName);
    });
    actualUsers.map((user) => {
      actualTransportUser.push(user.UserName);
    });

    console.log(`civil => ${JSON.stringify(civilTransportUsers)}`);
    console.log(`maint => ${JSON.stringify(maintTransportUsers)}`);
    console.log(`actual => ${JSON.stringify(actualTransportUser)}`);

    let confirmed =
      eqsTransData[0] && eqsTransData[0]?.Confirmed
        ? JSON.parse(eqsTransData[0]?.Confirmed)
        : [];
    let query = ``;
    let newTransData = {};
    if (eqsTransData.length === 0) {
      query = `INSERT INTO EquipmentsTransport VALUES(
        '${fieldsData?.StartDate}',
        '${fieldsData?.EndDate}',
        GETDATE(),
        '${fieldsData?.Equipment_Type}',
        '${fieldsData?.Equipment}',
        '${fieldsData?.UnderCarrage_Type}',
        '${fieldsData?.FromLocation}',
        '${fieldsData?.ToLocation}',
        '${JSON.stringify([fieldsData?.username])}',
        'UnConfirmed',
        'Civil'
    )`;
      newTransData = {
        ...fieldsData,
        ID: Number(eqsTransData[eqsTransData.length - 1]) + 1,
        Confirmed: JSON.stringify([fieldsData?.username]),
        Status: "UnConfirmed",
        Type: "Added",
      };
      civilUsers.map((user) => {
        if (user.UserName !== fieldsData.username) {
          emailArray.push(user.Email);
        }
      });
    } else {
      confirmed.push(fieldsData?.username);
      confirmed = Array.from(new Set(confirmed));

      let ConfirmFlag = true;
      const allUsersArray = civilTransportUsers.concat(
        maintTransportUsers,
        actualTransportUser
      );

      let civilCount = 0;
      let maintCount = 0;
      let actualCount = 0;
      for (let j = 0; j < confirmed.length; j++) {
        if (civilTransportUsers.includes(confirmed[j])) {
          civilCount += 1;
        } else if (maintTransportUsers.includes(confirmed[j])) {
          maintCount += 1;
        } else if (actualTransportUser.includes(confirmed[j])) {
          actualCount += 1;
        }
      }

      console.log(`civilCount => ${civilCount}`);
      console.log(`maintCount => ${maintCount}`);
      console.log(`actualCount => ${actualCount}`);

      let userGroup = ``;
      if (civilCount < civilTransportUsers.length) {
        userGroup = `Civil`;
        civilUsers.map((user) => {
          if (user.UserName !== fieldsData.username) {
            emailArray.push(user.Email);
          }
        });
      } else if (maintCount < maintTransportUsers.length) {
        userGroup = `Maintenance`;
        civilUsers.concat(maintUsers).map((user) => {
          if (user.UserName !== fieldsData.username) {
            emailArray.push(user.Email);
          }
        });
      } else {
        userGroup = `Transporter`;
        actualUsers.concat(civilUsers, maintUsers).map((user) => {
          if (user.UserName !== fieldsData.username) {
            emailArray.push(user.Email);
          }
        });
      }

      for (let i = 0; i < allUsersArray.length; i++) {
        if (!confirmed.includes(allUsersArray[i])) {
          ConfirmFlag = false;
          console.log(`not matched user => ${allUsersArray[i]}`);
        }
      }
      const status = ConfirmFlag ? "Confirmed" : "UnConfirmed";
      query = `UPDATE EquipmentsTransport SET 
               Confirmed = '${JSON.stringify(confirmed)}', 
               Status = '${status}',
               UserGroup = '${userGroup}' 
               WHERE ID = '${eqsTransData[0]?.ID}'`;
      newTransData = {
        ...fieldsData,
        ID: eqsTransData[0]?.ID,
        Confirmed: JSON.stringify(confirmed),
        Status: status,
        Type: "Edited",
      };
    }
    console.log(`emailArray => ${JSON.stringify(emailArray)}`);

    const result = await getData(query);
    const mailOptions = {
      from: { name: "Bauer", address: process.env.GMAIL_EMAIL },
      to: emailArray,
      subject: "New Transportation",
      text:
        newTransData.Type === "Added"
          ? `Wating for your confirm for Equipment ${fieldsData.Equipment} Transport from site ${fieldsData.FromLocation} to site ${fieldsData.ToLocation} in an interval of ${fieldsData.StartDate} to ${fieldsData.EndDate}\n
Please Visit link to Confirm: https://bauereg.onrender.com/Transportations`
          : `${fieldsData.username} Confirmed Equipment ${fieldsData.Equipment} Transport from site ${fieldsData.FromLocation} to site ${fieldsData.ToLocation} in an interval of ${fieldsData.StartDate} to ${fieldsData.EndDate}\n
Please Visit link to Confirm: https://bauereg.onrender.com/Transportations`,
    };
    if (emailArray && emailArray.length > 0)
      await transporter.sendMail(mailOptions);
    return res.status(200).json(newTransData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
