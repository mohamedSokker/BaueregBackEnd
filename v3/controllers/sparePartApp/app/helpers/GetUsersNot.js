const { getData } = require("../../../../helpers/getData");
const { model } = require("../../../../model/mainModel");

const getUserNotifications = async (req, res) => {
  try {
    const bodyData = req.body;
    const { limit, page } = req.query;
    let result = [];
    if (page && limit) {
      if (model["AppNotification"]) {
        result = model["AppNotification"]
          .filter((item) => item.ToUser === bodyData?.username)
          .sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime))
          .slice((page - 1) * limit, (page - 1) * limit + limit);
      } else {
        const query = `SELECT * FROM AppNotification WHERE ToUser = '${bodyData?.username}' 
                       ORDER BY DateTime DESC`;
        result = (await getData(query)).recordsets[0].slice(
          (page - 1) * limit,
          (page - 1) * limit + limit
        );
      }
    }
    console.log(result.length);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserNotifications };
