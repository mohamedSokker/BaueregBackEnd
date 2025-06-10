const config = {
  user: process.env.CONFIGAPP_USER,
  password: process.env.CONFIGAPP_PASSWORD,
  server: process.env.CONFIGAPP_SERVER,
  port: Number(process.env.CONFIGAPP_PORT),
  database: process.env.CONFIGAPP_DATABASE,
  synchronize: true,
  trustServerCertificate: true,
};

module.exports = config;
