import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import { initializeConnection } from './database/connect';

import * as user from './controllers/user';
import * as project from './controllers/project';
import * as status from './controllers/issueStatus';
import * as issue from './controllers/issue';

const app = express();
const port = 3000;

const startServer = async () => {
	try {
		await initializeConnection();

		app.use(express.json());
		app.use(cors());

		app.post('/authentication', user.authentication);

		app.post('/user', user.create);
		app.patch('/user/:id', user.update);
		app.delete('/user/:id', user.exclude);
		app.get('/user', user.list);

		app.post('/project', project.create);
		app.patch('/project/:id', project.update);
		app.delete('/project/:id', project.exclude);
		app.get('/project/', project.list);

		app.post('/issue-status', status.create);
		app.patch('/issue-status/:id', status.update);
		app.delete('/issue-status/:id', status.exclude);
		app.get('/issue-status', status.list);

		app.post('/issue', issue.create);
		app.patch('/issue/:id', issue.update);
		app.delete('/issue/:id', issue.exclude);
		app.get('/issue', issue.list);

		app.listen(port, () =>
			console.log('Running at endpoint http://localhost:%d', port),
		);
	} catch (error) {
		console.error(error);
	}
};

startServer();
