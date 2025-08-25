import { Response, Request } from 'express';

import { db } from '../database/connect';
import IssueStatus from '../entities/IssueStatus';

export const create = async (req: Request, res: Response) => {
	try {
		const { name }: IssueStatus = req.body;

		if (!name)
			return res.status(400).json({ message: 'Content error! name is empty' });

		const status = new IssueStatus(name.toUpperCase(), []);

		await db.getRepository(IssueStatus).save(status);

		return res
			.status(201)
			.json({ message: 'Success! Status has been created', status });
	} catch (err) {
		console.error(err);
		return res
			.status(400)
			.json({ message: 'Request error! Check console for details' });
	}
};

export const update = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name }: IssueStatus = req.body;

		!name
			? res.status(400).json({ message: 'Content error! name is empty' })
			: (req.body.name = name.toUpperCase());

		await db
			.getRepository(IssueStatus)
			.update(Number(id), req.body as IssueStatus);

		return res
			.status(204)
			.json({ message: 'Success! Status has been updated' });
	} catch (err) {
		console.error(err);
		return res
			.status(400)
			.json({ message: 'Request error! Check console for details' });
	}
};

export const exclude = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: 'Content error! id is empty' });

		await db.getRepository(IssueStatus).delete(Number(id));

		return res
			.status(204)
			.json({ message: 'Success! Status has been excluded' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Request error! Check console for details',
		});
	}
};

export const list = async (_req: Request, res: Response) => {
	try {
		const projects = await db.getRepository(IssueStatus).find();

		return res
			.status(200)
			.json({ message: 'Success! Status have been found', projects });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Request error! Check console for details',
		});
	}
};
