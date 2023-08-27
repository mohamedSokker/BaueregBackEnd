// config for your database
var config = {
  user: process.env.CONFIGAPPUSER_USER,
  password: CONFIGAPPUSER_PASSWORD,
  server: CONFIGAPPUSER_SERVER,
  port: CONFIGAPPUSER_PORT,
  database: CONFIGAPPUSER_DATABASE,
  synchronize: true,
  trustServerCertificate: true,
};

module.exports = config;
