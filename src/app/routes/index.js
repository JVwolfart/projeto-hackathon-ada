const express = require("express");
const routesCandidato = require("./routes.candidato");

const routes = express.Router();
routes.use(routesCandidato);

module.exports = routes;