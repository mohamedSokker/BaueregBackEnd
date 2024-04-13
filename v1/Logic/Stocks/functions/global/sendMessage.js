const { getMessaging } = require("firebase-admin/messaging");
const { app2 } = require("../../../../../v3/config/firebaseConfigs");

const sendMessage = async (fieldsData, tokens) => {
  const message = {
    notification: {
      title: fieldsData.title,
      body: fieldsData.body,
    },

    tokens: tokens,
  };

  if (tokens.length > 0) {
    getMessaging(app2)
      .sendEachForMulticast(message)
      .then((response) => {
        return { recieved: response.successCount };
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } else {
    throw new Error(`no tokens found`);
  }
};

module.exports = { sendMessage };
