require("dotenv").config();

const configYard = {
  user: process.env.CONFIG_USER_YARD,
  password: process.env.CONFIG_PASSWORD_YARD,
  server: process.env.CONFIG_SERVER_YARD,
  database: process.env.CONFIG_DATABASE_YARD,
  port: Number(process.env.CONFIG_PORT_YARD),
  synchronize: true,
  trustServerCertificate: true,
};

module.exports = configYard;
