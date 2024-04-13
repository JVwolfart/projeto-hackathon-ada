const cadastrarDeficienciaCandidatoService = require("../services/CadastrarDeficienciaCandidatoService");
const listarDeficienciasPorCandidatoService = require("../services/ListarDeficienciasPorCandidatoService");

class DeficienciaCandidatoController {
    async cadastrar(req, res, next){
        const {id_candidato, tipo_deficiencia, descricao, cid} = req.body;
        try {
            const deficienciaCandidato = await cadastrarDeficienciaCandidatoService.execute(id_candidato, tipo_deficiencia, descricao, cid);
            res.status(201).send(deficienciaCandidato)
            next();
        } catch (error) {
            next(error);
        }
    }

    async buscar_por_candidato(req, res, next){
        const {id_candidato} = req.params
        try {
            const deficienciasCandidato = await listarDeficienciasPorCandidatoService.execute(id_candidato);
            res.status(200).send(deficienciasCandidato);
            next();
        } catch (error) {
            next(error);
        }
    }
}

const deficienciaCandidatoController = new DeficienciaCandidatoController();

module.exports = deficienciaCandidatoController;