const config = {
  user: process.env.CONFIGAPPUSER_USER,
  password: process.env.CONFIGAPPUSER_PASSWORD,
  server: process.env.CONFIGAPPUSER_SERVER,
  port: Number(process.env.CONFIGAPPUSER_PORT),
  database: process.env.CONFIGAPPUSER_DATABASE,
  synchronize: true,
  trustServerCertificate: true,
};

module.exports = config;
