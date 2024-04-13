const { transporter } = require("../../../v3/config/mailConfig");

const emailEndPoint = (app) => {
  app.use("/api/v1/sendEmail", async (req, res) => {
    try {
      await transporter.sendMail(req.body);
      return res.status(200).json({ message: `Email Sent` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

module.exports = { emailEndPoint };
