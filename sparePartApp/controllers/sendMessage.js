const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

let { privateKey } = JSON.parse(process.env.SPAREPART_FIREBASE_PRIVATE_KEY);
// privateKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY, "base64").toString();

// const serviceAccount = require("path/to/serviceAccountKey.json");

const app = initializeApp(
  {
    credential: admin.credential.cert({
      type: "service_account",
      project_id: process.env.SPAREPART_FIREBASE_PROJECT_ID,
      private_key_id: process.env.SPAREPART_FIREBASE_PRTIVATE_KEY_ID,
      private_key: privateKey,
      client_email: process.env.SPAREPART_FIREBASE_CLIENT_EMAIL,
      client_id: process.env.SPAREPART_FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.SPAREPART_FIREBASE_CLIENT_CERT_URL,
      universe_domain: "googleapis.com",
    }),
    projectId: "bauersparepart",
  },
  "BauerSparePart"
);

const SparePartSendMessage = async (req, res) => {
  const fieldsData = req.body;
  const message = {
    notification: {
      title: fieldsData.title,
      body: fieldsData.body,
    },

    tokens: fieldsData.Tokens,
  };

  getMessaging(app)
    .sendEachForMulticast(message)
    .then((response) => {
      return res.status(200).json({ recieved: response.successCount });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

module.exports = { SparePartSendMessage };
