import { Request, Response } from 'express';

import User from '../entities/User';
import { db } from '../database/connect';

export const create = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({
				message: 'Failed to create user! Check values sent',
			});
		}

		const user = db.getRepository(User).create({ name });
		await db.getRepository(User).save(user);

		return res.status(201).json({
			message: 'User has been created successfully!',
			user,
		});
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Failed to create user! Check console for details',
		});
	}
};

export const update = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		if (!id) {
			return res.status(400).json({
				message: 'Failed to edit user! Check parameters sent',
			});
		}

		if (!name) {
			return res.status(400).json({
				message: 'Failed to edit user! Check values sent',
			});
		}

		await db.getRepository(User).update(Number(id), { name: name });

		return res
			.status(204)
			.json({ message: 'User has been edited succesfully!' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Failed to edit user! Check console for details',
		});
	}
};

export const exclude = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: 'Failed to delete user! Check parameters sent',
			});
		}

		await db.getRepository(User).delete(Number(id));

		return res
			.status(204)
			.json({ message: 'User has been deleted successfully!' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Failed to delete user! Check console for details',
		});
	}
};

export const list = async (_req: Request, res: Response) => {
	const users = await db.getRepository(User).find();
	return res.status(200).json(users);
};

export const authentication = async (req: Request, res: Response) => {
	try {
		const { name, password } = req.body;

		if (!name)
			return res.status(400).json({
				message: 'Can not match user! Check parameters sent',
			});

		const searchUser = await db.getRepository(User).findBy({ name: name });

		if (searchUser.length > 0)
			return res.status(200).json({
				message: 'User has been founded!',
			});

		return res.status(404).json({
			message: 'User has not been founded!',
		});
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Failed to match user! Check console for details',
		});
	}
};
