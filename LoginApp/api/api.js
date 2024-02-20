const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

let CurrDir = process.env.CURRENT_DIRECTORY;
const { auth } = require("../../controllers/auth");

const loginAppEndPoints = (app) => {
  app.get("/loginapp", (req, res) => {
    res.sendFile(CurrDir + "/loginapp.html");
  });

  // let schemas = require("./routes/schemas");
  // app.use("/All", schemas);

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Bauer RESTAPI",
        version: "1.0.0",
      },
      servers: [
        {
          url: `${process.env.BASE_URL}/`,
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

  const specs = swaggerjsdoc(options);
  app.use("/doc", auth, swaggerui.serve, swaggerui.setup(specs));

  app.get("*", (req, res) => {
    return res.status(400).json({ message: "No route found" });
  });
  app.post("*", (req, res) => {
    return res.status(400).json({ message: "No route found" });
  });
  app.put("*", (req, res) => {
    return res.status(400).json({ message: "No route found" });
  });
  app.delete("*", (req, res) => {
    return res.status(400).json({ message: "No route found" });
  });
};

module.exports = { loginAppEndPoints };
