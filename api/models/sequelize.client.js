import { Sequelize } from "sequelize";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL manquante");
}

const isProd = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,

    define: {
        freezeTableName: true,
    	timestamps: true,
    	underscored: true,
    },

    // ✅ Render / prod : SSL requis la plupart du temps
    dialectOptions: isProd
    ? {
        ssl: { rejectUnauthorized: false },
        keepAlive: true,
        }
    : {},

    pool: { max: 5, min: 0, idle: 10_000, acquire: 60_000 },
});

export default sequelize;
