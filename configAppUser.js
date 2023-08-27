// config for your database
var config = {
  user: process.env.CONFIGAPPUSER_USER,
  password: process.env.CONFIGAPPUSER_PASSWORD,
  server: process.env.CONFIGAPPUSER_SERVER,
  port: process.env.CONFIGAPPUSER_PORT,
  database: process.env.CONFIGAPPUSER_DATABASE,
  synchronize: true,
  trustServerCertificate: true,
};

module.exports = config;
