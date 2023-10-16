const { getData } = require("../../../functions/getData");

const logic = async (req, res) => {
  try {
    const fieldsData = req.body;
    let query = ``;
    let dataQuery = ``;
    const dataMainQuery = `SELECT * FROM Equipments_Location 
                       WHERE End_Date IS NULL AND 
                       Location = '${fieldsData.Location}'`;
    const mainQuery = `SELECT COUNT(Equipment_Type) AS COUNT
                       FROM Equipments_Location 
                       WHERE End_Date IS NULL AND
                       Location = '${fieldsData.Location}'`;
    query = `${mainQuery}`;
    dataQuery = `${dataMainQuery}`;

    let data = await getData(query);
    data = data.recordsets[0];
    const allData = await getData(dataQuery);
    let per = 0;
    if (!data[0]?.COUNT) {
      per = 0;
    } else {
      per = data[0]?.COUNT;
    }

    const result = {
      per: Number(per),
      data: allData.recordsets[0],
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = logic;
