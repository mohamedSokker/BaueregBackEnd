const { getData } = require("../../functions/getData");

const transportUsers = ["Eng Osama Saad", "Eng Abdelaziz"];

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    console.log(fieldsData);
    if (!fieldsData?.StartDate || !fieldsData.EndDate)
      return res
        .status(500)
        .json({ message: `Start Date Or End Date Can't be empty` });

    const eqsTransQuery = `SELECT * FROM EquipmentsTransport 
                           WHERE ToLocation = '${fieldsData?.ToLocation}' 
                           AND Equipment = '${fieldsData?.Equipment}'
                           AND Status = 'UnConfirmed'`;
    const eqsTransData = (await getData(eqsTransQuery)).recordsets[0];
    let confirmed =
      eqsTransData[0] && eqsTransData[0]?.Confirmed
        ? JSON.parse(eqsTransData[0]?.Confirmed)
        : [];
    let query = ``;
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
        'UnConfirmed'
    )`;
    } else {
      confirmed.push(fieldsData?.username);
      confirmed = Array.from(new Set(confirmed));
      let confirmFlag = true;
      for (let i = 0; i < transportUsers.length; i++) {
        if (!confirmed.includes(transportUsers[i])) {
          confirmFlag = false;
          break;
        }
      }
      const status = confirmFlag ? "Confirmed" : "unConfirmed";
      query = `UPDATE EquipmentsTransport SET Confirmed = '${JSON.stringify(
        confirmed
      )}', Status = '${status}' WHERE ID = '${eqsTransData[0]?.ID}'`;
    }

    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
