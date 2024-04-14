const candidatoRepository = require("../repositories/CandidatoRepository");

class ListarCandidatosService {
    async execute(pagina){
        if(!pagina || pagina < 1 || isNaN(pagina)){
            pagina = 1;
        }
        const candidatos = await candidatoRepository.listar(pagina);
        return candidatos;
    }
}

const listarCandidatosService = new ListarCandidatosService();

module.exports = listarCandidatosService;