import { Request, Response } from 'express';

import User from '../entities/User';
import { db } from '../database/connect';

export const create = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({
				message: 'Failed! Body is empty',
			});
		}

		const user = db
			.getRepository(User)
			.create({ name: name.toUpperCase(), isActive: true });
		await db.getRepository(User).save(user);

		return res.status(201).json({
			message: 'Success! User created',
			user,
		});
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Failed! Check console for details',
		});
	}
};

export const update = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		if (!id) {
			return res.status(400).json({
				message: 'Failed! ID is empty',
			});
		}

		if (!name) {
			return res.status(400).json({
				message: 'Failed! Body is empty',
			});
		}

		await db
			.getRepository(User)
			.update(Number(id), { name: name.toUpperCase() });

		return res.status(204).json({ message: 'Success! User updated' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Failed! Check console for details',
		});
	}
};

export const exclude = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: 'Failed! ID is empty',
			});
		}

		await db.getRepository(User).delete(Number(id));

		return res.status(204).json({ message: 'Success! User excluded' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Failed! Check console for details',
		});
	}
};

export const list = async (_req: Request, res: Response) => {
	const users = await db.getRepository(User).find();
	return res.status(200).json(users);
};

export const authentication = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;

		if (!name)
			return res.status(400).json({
				message: 'Failed! Request body is empty',
			});

		const searchUser = await db.getRepository(User).findBy({ name: name });

		if (searchUser.length > 0)
			return res.status(200).json({
				message: 'Success! User matches with parameters',
			});

		return res.status(404).json({
			message: 'Failed! No users matches with parameters',
		});
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Failed! Check console for details',
		});
	}
};
