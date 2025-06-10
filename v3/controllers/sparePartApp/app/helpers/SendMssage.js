const { getMessaging } = require("firebase-admin/messaging");
const { app2 } = require("../../../../config/firebaseConfigs");

const SparePartSendMessage = async (req, res) => {
  const fieldsData = req.body;
  const message = {
    notification: {
      title: fieldsData.title,
      body: fieldsData.body,
    },

    tokens: fieldsData.Tokens,
  };

  getMessaging(app2)
    .sendEachForMulticast(message)
    .then((response) => {
      return res.status(200).json({ recieved: response.successCount });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

module.exports = { SparePartSendMessage };
