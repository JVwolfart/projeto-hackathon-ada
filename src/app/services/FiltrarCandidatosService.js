const candidatoRepository = require("../repositories/CandidatoRepository");

class FiltrarCandidatosService {
    async execute(campos){
        const candidatos = await candidatoRepository.listar_filtros(campos);
        return candidatos;
    }
}

const filtrarCandidatosService = new FiltrarCandidatosService();

module.exports = filtrarCandidatosService;