const { Sequelize } = require("sequelize");

const dotEnv = require("dotenv")

const nodeEnv = process.env.NODE_ENV;

const path = nodeEnv ? `.env.${nodeEnv}` : ".env";

dotEnv.config({ path })

const DB_DIALECT = process.env.DB_DIALECT
const DB_STORAGE = process.env.DB_STORAGE


const sequelize = new Sequelize({
    dialect: DB_DIALECT,
    storage: DB_STORAGE,
    logging: nodeEnv === "test" ? undefined : console.log,
});
/*const sequelize = new Sequelize(
    {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: 5432,
        dialect: "postgres"
    }
)*/



module.exports = sequelize;