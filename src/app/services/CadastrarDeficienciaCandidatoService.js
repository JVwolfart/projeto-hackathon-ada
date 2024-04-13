const candidatoRepository = require("../repositories/CandidatoRepository");
const AppError = require("../errors/AppError");
const deficienciaCandidatoRepository = require("../repositories/DeficienciaCandidatoRepository");

class CadastrarDeficienciaCandidatoService {
    async execute(id_candidato, tipo_deficiencia, descricao, cid){
        if(!id_candidato || !tipo_deficiencia){
            throw new AppError("ERRO! Necessário informar o id do candidato e o tipo de deficiência");
        }
        const candidato = await candidatoRepository.buscar_por_id(id_candidato);
        if(!candidato){
            throw new AppError("ERRO! Candidato não encontrado", 404);
        }
        if(!candidato.pcd){
            throw new AppError("ERRO! Candidato não informou ser PcD. Verifique o cadastro do candidato")
        }
        tipo_deficiencia = tipo_deficiencia.toLowerCase();
        const deficienciaCandidato = {id_candidato: id_candidato, tipo_deficiencia: tipo_deficiencia, descricao: descricao, cid: cid};
        const novaDeficienciaCandidato = await deficienciaCandidatoRepository.cadastrar(deficienciaCandidato);
        return novaDeficienciaCandidato;
    }
}

const cadastrarDeficienciaCandidatoService = new CadastrarDeficienciaCandidatoService();

module.exports = cadastrarDeficienciaCandidatoService;