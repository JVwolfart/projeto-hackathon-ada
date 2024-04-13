const AppError = require("../errors/AppError");
const candidatoRepository = require("../repositories/CandidatoRepository");

class ContratarCandidatoService {
    async execute(id_candidato, data_contratacao, usuario, nivel_acesso){
        if(!id_candidato || !data_contratacao || !usuario || !nivel_acesso){
            throw new AppError("ERRO! Nenhum campo pode ficar vazio");
        }
        const candidato = await candidatoRepository.buscar_por_id(id_candidato);
        if(!candidato){
            throw new AppError("ERRO! Candidato não encontrado", 404);
        }
        if(candidato.data_contratacao !== null){
            throw new AppError("ERRO! Este candidato já consta como contratado");
        }
        if(!(usuario.email !== process.env.SUPERUSER || usuario.senha !== process.env.PASSWORD_SUPERUSER) && parseInt(usuario.nivel_acesso) <= parseInt(nivel_acesso)){
            throw new AppError(`ERRO! Seu nível de acesso é ${usuario.nivel_acesso}. Você só tem permissão para setar um nível menor que o seu para o usuário. Se necessitar de um nível maior, solicite ao ROOT`);
        }
        if(usuario.email === process.env.SUPERUSER && usuario.senha === process.env.PASSWORD_SUPERUSER){
            usuario.id = "ROOT";
        }
        const candidatoContratado = await candidatoRepository.contratar(candidato, data_contratacao, usuario, nivel_acesso);
        return candidatoContratado;
    }
}

const contratarCandidatoService = new ContratarCandidatoService();

module.exports = contratarCandidatoService;