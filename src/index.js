const express = require("express");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yaml");
const path = require("path");
const fs = require("fs");
const rateLimit = require("express-rate-limit");

const { ServerConfig, Logger } = require("./config");

const apiRoutes = require("./routes");

// Rate Limiter settings
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10,
});

const app = express();

app.use(limiter);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const file = fs.readFileSync(
  path.resolve(__dirname, "./docs/swagger.yaml"),
  "utf8"
);
const swaggerDocument = yaml.parse(file);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: "none", // keep all the sections collapsed by default
    },
  })
);

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  Logger.info(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
