// config for your database
// var config = {
//     user: 'mohamed',
//     password: 'mohamed',
//     server: '62.114.122.39',
//     port: 2433,
//     database: 'Bauer_Reports',
//     synchronize: true,
//     trustServerCertificate: true,
// };

var config = {
  user: process.env.CONFIG_USER,
  password: process.env.CONFIG_PASSWORD,
  server: process.env.CONFIG_SERVER,
  database: process.env.CONFIG_DATABASE,
  synchronize: true,
  trustServerCertificate: true,
};

module.exports = config;
