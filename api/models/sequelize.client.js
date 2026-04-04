import { Sequelize } from "sequelize";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL manquante");
}

// Détecter si c'est une connexion Render (host distant)
const isRender = process.env.DATABASE_URL.includes("render.com");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,

  define: {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  },

  // ⚡ SSL obligatoire pour Render
  dialectOptions: isRender
    ? {
        ssl: { require: true, rejectUnauthorized: false },
        keepAlive: true,
      }
    : {},

  pool: { max: 5, min: 0, idle: 10_000, acquire: 60_000 },
});

export default sequelize;