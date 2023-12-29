const { getData } = require("../../functions/getData");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    const eqsTransQuery = `SELECT * FROM EquipmentsTransport 
                           WHERE Location = '${fieldsData?.Location}' 
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
        GETDATE(),
        '${fieldsData?.Equipment_Type}',
        '${fieldsData?.Equipment}',
        '${fieldsData?.UnderCarrage_Type}',
        '${fieldsData?.Location}',
        '${JSON.stringify([fieldsData?.username])}',
        'UnConfirmed'
    )`;
    } else {
      confirmed.push(fieldsData?.username);
      confirmed = Array.from(new Set(confirmed));
      query = `UPDATE EquipmentsTransport SET Confirmed = '${JSON.stringify(
        confirmed
      )}' WHERE ID = '${eqsTransData[0]?.ID}'`;
    }

    const result = await getData(query);
    return res.status(200).json(result.recordsets[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logic };
