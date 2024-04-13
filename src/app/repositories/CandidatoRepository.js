const sequelize = require("../../infra/db");
const CandidatoModel = require("../../infra/db/models/Candidato");
const uuid = require("uuid")

class CandidatoRepository {
    async cadastrar(candidato){
        const novoCandidato = await CandidatoModel.create({id: uuid.v4(), ...candidato});
        return novoCandidato.dataValues;
    }

    async listar(){
        const candidatos = await CandidatoModel.findAll();
        //const teste = await sequelize.query("SELECT etnia, COUNT(etnia) as n_candidatos FROM Candidato GROUP BY etnia ORDER BY n_candidatos DESC");
        //console.log(teste);
        return candidatos;
    }

    async listar_filtros(campos){
        
        const query = `SELECT * FROM Candidato WHERE ${campos.join(' AND ')}`
        console.log(query)
        const resultados = await sequelize.query(query)
        
        return resultados;
    }

    async listar_candidatos_pcd(){
        const candidatos = await CandidatoModel.findAll({where: {pcd: true}});
        return candidatos;
    }

    async buscar_por_cpf(cpf){
        const candidato = await CandidatoModel.findOne({
            where: {
                cpf: cpf
            }
        });
        if(candidato){
            return candidato.dataValues;
        }
        return null;
    }

    async buscar_por_email(email){
        const candidato = await CandidatoModel.findOne({
            where: {
                email: email
            }
        });
        if(candidato){
            return candidato.dataValues;
        }
        return null;
    }

    async buscar_por_id(id){
        const candidato = await CandidatoModel.findByPk(id);
        if(candidato){
            return candidato.dataValues;
        }
        return null;
    }

    async contratar(candidato, data_contratacao, usuario, nivel_acesso){
        const candidatoContratado = await CandidatoModel.update({
            data_contratacao: data_contratacao,
            usuario_alterou: usuario.id,
            nivel_acesso: nivel_acesso,
            data_demissao: null
        }, {
            where: {
                id: candidato.id
            }
        }
        )
        return candidatoContratado;
    }
    
    async desligar(candidato, data_demissao, usuario, nivel_acesso){
        
    }
}

const candidatoRepository = new CandidatoRepository();

module.exports = candidatoRepository