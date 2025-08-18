import { Sequelize } from "sequelize";

const sequelize = new Sequelize("blog_management", "postgres", "Postgres2025", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

export default sequelize;
