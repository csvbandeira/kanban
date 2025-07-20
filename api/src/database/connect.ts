import { DataSource } from "typeorm";

import User from "../entities/User";

const databaseConfig = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	entities: [User],
	logging: true,
	synchronize: true,
});

const initializeConnection = async () => {
	if (!databaseConfig.isInitialized) await databaseConfig.initialize();
};

export { initializeConnection, databaseConfig as db };
