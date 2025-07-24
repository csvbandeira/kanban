import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import { initializeConnection } from './database/connect';

import * as user from './controllers/user';

const app = express();
const port = 3000;

const startServer = async () => {
	try {
		await initializeConnection();

		app.use(express.json());
		app.use(cors());

		app.post('/user', user.create);
		app.patch('/user/:id', user.update);
		app.delete('/user/:id', user.exclude);
		app.get('/user', user.list);

		app.listen(port, () =>
			console.log('Running at endpoint http://localhost:%d', port),
		);
	} catch (error) {
		console.error(error);
	}
};

startServer();
