const AppError = require("../errors/AppError");
const candidatoRepository = require("../repositories/CandidatoRepository");

class DesligarCandidatoService {
    async execute(id_candidato, data_demissao, usuario){
        const NIVEIS_ACESSO = ["0", "1", "2", "3", "4", "5"];
        if(!id_candidato || !data_demissao || !usuario){
            throw new AppError("ERRO! Nenhum campo pode ficar vazio");
        }
        const candidato = await candidatoRepository.buscar_por_id(id_candidato);
        if(!candidato){
            throw new AppError("ERRO! Funcionário não encontrado", 404);
        }
        if(candidato.data_contratacao === null){
            throw new AppError("ERRO! Este funcionário não pode ser desligado, pois ainda não foi contratado");
        }
        if(usuario.email === process.env.SUPERUSER && usuario.senha === process.env.PASSWORD_SUPERUSER){
            usuario.id = "ROOT";
        }
        const candidatoDesligado = await candidatoRepository.desligar(candidato, data_demissao, usuario);
        return candidatoDesligado;
    }
}

const desligarCandidatoService = new DesligarCandidatoService();

module.exports = desligarCandidatoService;