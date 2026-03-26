import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "my_database",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export default sequelize;