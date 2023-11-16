const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const dotenv = require("dotenv").config();

// const { privateKey1 } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
// console.log(privateKey1);
// console.log(process.env.FIREBASE_PROJECT_ID);

const app1 = initializeApp(
  {
    credential: admin.credential.cert({
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRTIVATE_KEY_ID,
      private_key: JSON.parse(process.env.FIREBASE_PRIVATE_KEY).privateKey,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
      universe_domain: "googleapis.com",
    }),
    projectId: "bauereg-bc3ce",
  },
  "BauerEg"
);

// const { privateKey2 } = JSON.parse(process.env.SPAREPART_FIREBASE_PRIVATE_KEY);
// console.log(privateKey2);

const app2 = initializeApp(
  {
    credential: admin.credential.cert({
      type: "service_account",
      project_id: process.env.SPAREPART_FIREBASE_PROJECT_ID,
      private_key_id: process.env.SPAREPART_FIREBASE_PRTIVATE_KEY_ID,
      private_key: JSON.parse(process.env.SPAREPART_FIREBASE_PRIVATE_KEY)
        .privateKey,
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

module.exports = { app1, app2 };
