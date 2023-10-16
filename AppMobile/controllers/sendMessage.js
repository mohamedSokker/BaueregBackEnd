const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

// const serviceAccount = require("path/to/serviceAccountKey.json");

try {
  initializeApp({
    credential: applicationDefault(),
    projectId: "bauereg-bc3ce",
  });
} catch (error) {
  console.log(error.message);
}

const sendMessage = async (req, res) => {
  const fieldsData = req.body;
  const message = {
    notification: {
      title: fieldsData.title,
      body: fieldsData.body,
    },

    tokens: fieldsData.Tokens,
  };

  getMessaging()
    .sendEachForMulticast(message)
    .then((response) => {
      return res.status(200).json({ recieved: response.successCount });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

module.exports = { sendMessage };
