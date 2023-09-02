const config = {
  user: process.env.CONFIG_USER,
  password: process.env.CONFIG_PASSWORD,
  server: process.env.CONFIG_SERVER,
  database: process.env.CONFIG_DATABASE,
  synchronize: true,
  trustServerCertificate: true,
};

module.exports = config;
