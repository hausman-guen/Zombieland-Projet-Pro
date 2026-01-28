//On importe sequelize
import { Sequelize } from 'sequelize';

// import de dotenv pour lire le fichier .env
import 'dotenv/config';

//On configure sequelize pour notre database zombieland
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    // define configure le comportement par défaut de Sequelize
	define: {
		// Une convention pour que Sequelize ne mette pas les noms de table au pluriel
		freezeTableName: true,
		// Ajoute les colonnes createdAt et updatedAt à chaque table
		timestamps: true,
		// Utilise le snake_case pour les champs auto-générés (createdAt -> created_at)
		underscored: true,
	},
	dialect: "postgres",
    logging: false,
    dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
    keepAlive: true,
    },
    pool: { max: 5, min: 0, idle: 10_000, acquire: 60_000 },
});

//On exporte notre instance de sequelize
export default sequelize;