const express = require("express");
const errorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");

const dashboardController = require("../controllers/DashboardController");
const autenticacaoMiddleware = require("../middlewares/AutenticacaoMiddleware");
const middlewareNivel_2 = require("../middlewares/MiddlewareNivel_2");

const routesDashboard = express.Router();

// EXEMPLO: http://localhost:3000/dashboard?etnia=branca&orientacao_sexual=homossexual

routesDashboard.get("/dashboard", autenticacaoMiddleware.execute, middlewareNivel_2.execute, dashboardController.carregar);
routesDashboard.get("/dashboard/report", dashboardController.donuts);

routesDashboard.use(errorHandlerMiddleware.execute)
module.exports = routesDashboard;