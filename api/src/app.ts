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

		app.post("/user", async (req: Request, res: Response) => {
			try {
				const { name } = req.body;

				if (!name) {
					console.log("Teste");
					return res.status(400).json({
						message:
							"Erro ao criar usuário! Verifique se todos os campos obrigatórios foram preenchidos corretamente.",
					});
				}

				const user = db.getRepository(User).create({ name });
				await db.getRepository(User).save(user);

				return res.status(201).json({
					message: "Usuário criado com sucesso!",
					user,
				});
			} catch (err) {
				console.error(err);
				return;
			}
		});

		app.patch("/user/:id", async (req: Request, res: Response) => {
			try {
				const { id } = req.params;
				const { name } = req.body;

				if (!name) {
					console.log("Teste");
					return res.status(400).json({
						message:
							"Erro ao editar usuário! Verifique se todos os campos obrigatórios foram preenchidos corretamente.",
					});
				}

				await db.getRepository(User).update(Number(id), { name: name });

				return res
					.status(204)
					.json({ message: "Usuário editado com sucesso!" });
			} catch (err) {
				console.error(err);
				return;
			}
		});

		app.delete("/user/:id", async (req: Request, res: Response) => {
			try {
				const { id } = req.params;

				if (!id) {
					return res.status(400).json({
						message:
							"Erro ao excluir usuário! Verifique se os parâmetros são válidos!",
					});
				}

				await db.getRepository(User).delete(Number(id));

				return res
					.status(204)
					.json({ message: "Usuário excluído com sucesso!" });
			} catch (err) {
				console.error(err);
				return;
			}
		});

		app.get("/user", async (req: Request, res: Response) => {
			const users = await db.getRepository(User).find();
			return res.status(200).json(users);
		});

		app.listen(port, () =>
			console.log("Running at endpoint http://localhost:%d", port)
		);
	} catch (error) {
		console.error(error);
	}
};

startServer();
