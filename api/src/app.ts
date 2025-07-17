import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response } from "express";
import cors from "cors";

import { initializeConnection, db } from "./database/connect";
import User from "./entities/User";

const app = express();
const port = 3000;

const startServer = async () => {
	try {
		await initializeConnection();

		app.use(express.json());
		app.use(cors());

		app.get("/", async (req: Request, res: Response) => {
			const users = await db.getRepository(User).find();
			res.json(users);
		});

		app.listen(port, () =>
			console.log("Running at endpoint http://localhost:%d", port)
		);
	} catch (error) {
		console.error(error);
	}
};

startServer();
