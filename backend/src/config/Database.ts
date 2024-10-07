import { Sequelize } from "sequelize";

const dbDialect = "mysql";


const db =  new Sequelize("tokoword", "root" , "", {
   host: "localhost",
   dialect: dbDialect
} )

export default db



