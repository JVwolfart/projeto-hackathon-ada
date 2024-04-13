const candidatoRepository = require("../repositories/CandidatoRepository");

class ListarCandidatosPcdService {
    async execute(){
        const candidatos = await candidatoRepository.listar_candidatos_pcd();
        return candidatos;
    }
}

const listarCandidatosPcdService = new ListarCandidatosPcdService();

module.exports = listarCandidatosPcdService;