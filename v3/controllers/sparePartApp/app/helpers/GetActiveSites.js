const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getActiveSites = async (req, res) => {
  try {
    let result = [];
    if (model["Equipments_Location"] && model["Location_Bauer"]) {
      model["Equipments_Location"]
        .filter((item) => item.End_Date === null)
        .map((eqLoc) => {
          const targetLoc = model["Location_Bauer"].find(
            (loc) => loc.Location === eqLoc.Location
          );
          console.log(targetLoc);
          result = [
            ...result,
            { ...eqLoc, Location_Ar: targetLoc["Location_Ar "] },
          ];
        });
    } else {
      const query = `SELECT DISTINCT 
                    Equipments_Location.Location, 
                    Location_Bauer.Location_Ar
                    FROM Equipments_Location 
                    JOIN Location_Bauer
                    ON (Equipments_Location.Location = Location_Bauer.Location)
                    WHERE Equipments_Location.End_Date IS NULL`;
      result = (await getData(query)).recordsets[0];
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActiveSites };
