const { Op } = require("sequelize");
const sequelize = require("../../infra/db");
const CandidatoModel = require("../../infra/db/models/Candidato");
const uuid = require("uuid")

class CandidatoRepository {
    async cadastrar(candidato){
        const novoCandidato = await CandidatoModel.create({id: uuid.v4(), ...candidato});
        return novoCandidato.dataValues;
    }

    async listar(pagina){
        const candidatos = await CandidatoModel.findAll({
            limit: 20,
            offset: 20*(pagina-1),
            order: [["nome", "ASC"]]  
        });
        const totRegistrosTabela = await CandidatoModel.count()
        const totRegistrosEnviados = candidatos.length
        return {totRegistrosTabela, totRegistrosEnviados, candidatos};
    }

    async listar_filtros(campos){
        
        const query = `SELECT * FROM Candidato WHERE ${campos.join(' AND ')}`
        console.log(query)
        const resultados = await sequelize.query(query)
        
        return resultados;
    }

    async listar_candidatos_pcd(pagina, funcionario=null){
        let candidatos;
        let totRegistrosConsulta;
        let tipoConsulta;
        if(funcionario === null){
            candidatos = await CandidatoModel.findAll(
                {
                    where: {
                        pcd: true
                    },
                    limit: 20,
                    offset: 20*(pagina-1),
                    order: [["nome", "ASC"]]
                }
            );
            totRegistrosConsulta = await CandidatoModel.count({
                where: {
                pcd: true
                }
            })
            tipoConsulta = "Todas as pessoas PcD cadastradas no sistema, incluindo candidatos e funcionários";
        } else if(funcionario) {
            candidatos = await CandidatoModel.findAll(
                {
                    where: {
                        pcd: true,
                        [Op.not]: {
                            data_contratacao: null
                        }
                    },
                    limit: 20,
                    offset: 20*(pagina-1),
                    order: [["nome", "ASC"]]
                }
            );
            totRegistrosConsulta = await CandidatoModel.count({
                where: {
                    pcd: true,
                    [Op.not]: {
                        data_contratacao: null
                    }
                },
            })
            tipoConsulta = "Apenas os funcionários PcD contratados e em atividade";
        } else {
            candidatos = await CandidatoModel.findAll(
                {
                    where: {
                        pcd: true,
                        data_contratacao: null
                    },
                    limit: 20,
                    offset: 20*(pagina-1),
                    order: [["nome", "ASC"]]
                }
            );
            totRegistrosConsulta = await CandidatoModel.count({
                where: {
                    pcd: true,
                    data_contratacao: null
                },
            })
            tipoConsulta = "Apenas os candidatos PcD ainda não contratados";
        }
        const totRegistrosEnviadosNaPagina = candidatos.length;
        return {totRegistrosConsulta, tipoConsulta, totRegistrosEnviadosNaPagina, candidatos};
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
    
    async desligar(candidato, data_demissao, usuario){
        const candidatoDesligado = await CandidatoModel.update({
            data_ultima_contratacao: candidato.data_contratacao,
            data_contratacao: null,
            usuario_alterou: usuario.id,
            nivel_acesso: "0",
            data_demissao: data_demissao
        }, {
            where: {
                id: candidato.id
            }
        }
        )
        return candidatoDesligado;
    }
}

const candidatoRepository = new CandidatoRepository();

module.exports = candidatoRepository