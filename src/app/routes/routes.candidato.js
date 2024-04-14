const express = require("express");
const candidatoController = require("../controllers/CandidatoController");
const errorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const deficienciaCandidatoController = require("../controllers/DeficienciaCandidatoController");
const rateLimit = require("express-rate-limit");
const middlewareNivel_1 = require("../middlewares/MiddlewareNivel_1");
const middlewareNivel_4 = require("../middlewares/MiddlewareNivel_4");
const dadosUserController = require("../controllers/DadosUserController");
const autenticacaoMiddleware = require("../middlewares/AutenticacaoMiddleware");

const routesCandidato = express.Router();

const requestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: {mensagem: "ATENÇÃO! Você atingiu seu limite de requisições a essa rota. Tente novamente mais tarde"}
})


routesCandidato.post("/candidato", requestLimiter, candidatoController.cadastrar);
routesCandidato.get("/candidato", candidatoController.listar);
routesCandidato.get("/candidato/pcd", candidatoController.listar_candidatos_pcd);
routesCandidato.post("/login", requestLimiter, candidatoController.login)
routesCandidato.get("/teste_login", requestLimiter, middlewareNivel_1.execute, dadosUserController.dados_user);
routesCandidato.get("/whoami", requestLimiter, dadosUserController.dados_user);

routesCandidato.post("/deficiencia_candidato", requestLimiter, deficienciaCandidatoController.cadastrar);
routesCandidato.get("/deficiencia_candidato/:id_candidato", deficienciaCandidatoController.buscar_por_candidato);

routesCandidato.put("/contratar/:id_candidato", autenticacaoMiddleware.execute, requestLimiter, middlewareNivel_4.execute, candidatoController.contratar)
routesCandidato.put("/desligar/:id_candidato", autenticacaoMiddleware.execute, requestLimiter, middlewareNivel_4.execute, candidatoController.desligar)

routesCandidato.get("/deficiencia_candidato/:id_candidato", deficienciaCandidatoController.buscar_por_candidato);

routesCandidato.use(errorHandlerMiddleware.execute)
module.exports = routesCandidato;