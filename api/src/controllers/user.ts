import { Request, Response } from 'express';

import User from '../entities/User';
import { db } from '../database/connect';

export const create = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;

		if (!name)
			return res.status(400).json({
				message: 'Content error! name is empty',
			});

		const newUser = new User(name.toUpperCase(), true, [], []);

		const user = db.getRepository(User).create(newUser);

		await db.getRepository(User).save(user);

		return res.status(201).json({
			message: 'Success! User has been created',
			user,
		});
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Request error! Check console for details',
		});
	}
};

export const update = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		console.log(req.body);

		if (!id)
			return res.status(400).json({
				message: 'Content error! id is empty',
			});

		for (let value in req.body) {
			if (typeof value === 'string') {
				if (req.body[value] === null || req.body[value].trim().length === 0)
					return res
						.status(400)
						.json({ message: `Content error! ${value} is empty` });
			}

			if (value === 'isActive' && typeof req.body[value] !== 'boolean')
				return res
					.status(400)
					.json({ message: `Type error! ${value} must be a boolean` });
		}

		await db.getRepository(User).update(Number(id), req.body);

		return res.status(204).json({ message: 'Success! User has been updated' });
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
				message: 'Content error! id is empty',
			});
		}

		await db.getRepository(User).delete(Number(id));

		return res.status(204).json({ message: 'Success! User has been excluded' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Request error! Check console for details',
		});
	}
};

export const list = async (_req: Request, res: Response) => {
	try {
		const users = await db.getRepository(User).find();

		return res
			.status(200)
			.json({ message: 'Success! Users have been found', users });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Request error! Check console for details',
		});
	}
};

export const authentication = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;

		if (!name)
			return res.status(400).json({
				message: 'Failed! Request body is empty',
			});

		const searchUser = await db
			.getRepository(User)
			.findBy({ name: name.toUpperCase() });

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
