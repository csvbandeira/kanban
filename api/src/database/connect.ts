import { DataSource } from 'typeorm';

import User from '../entities/User';

const databaseConfig = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	entities: [User],
	logging: true,
	synchronize: true,
	timezone: '-03:00',
});

const initializeConnection = async () => {
	try {
		if (!databaseConfig.isInitialized) await databaseConfig.initialize();
	} catch (err) {
		console.error('Database connection failed!', err);
	}
};

export { initializeConnection, databaseConfig as db };
