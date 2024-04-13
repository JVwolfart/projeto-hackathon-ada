const candidatoRepository = require("../repositories/CandidatoRepository");

class ListarCandidatosService {
    async execute(){
        const candidatos = await candidatoRepository.listar();
        return candidatos;
    }
}

const listarCandidatosService = new ListarCandidatosService();

module.exports = listarCandidatosService;