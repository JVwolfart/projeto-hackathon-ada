const filtrarCandidatosService = require("../services/FiltrarCandidatosService");

class DashboardController {
    async carregar(req, res, next){
        const queryParams = []
        for (const key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                queryParams.push(`${key}='${req.query[key]}'`)
            }
        }
        try {
            const candidatos = await filtrarCandidatosService.execute(queryParams);
            console.log(queryParams)
            console.log(candidatos)
            res.status(200).send(candidatos)
        } catch (error) {
            next(error);
        }
    }
}

const dashboardController = new DashboardController();

module.exports = dashboardController;