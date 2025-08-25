import { Response, Request } from 'express';

import Project from '../entities/Project';
import { db } from '../database/connect';

export const create = async (req: Request, res: Response) => {
	try {
		const { title, createdBy, description, issues, members } =
			req.body as Project;

		if (!title)
			return res.status(400).json({
				message: 'Content error! title is empty',
			});

		if (!createdBy)
			return res.status(400).json({
				message: 'Content error! createdBy is empty',
			});

		if (typeof createdBy !== 'number')
			return res.status(400).json({
				message: 'Type error! createdBy must be a number',
			});

		const newProject = new Project(
			title.toUpperCase(),
			description,
			createdBy,
			true,
			members,
			issues,
		);

		const project = db.getRepository(Project).create(newProject);

		await db.getRepository(Project).save(project);

		return res
			.status(201)
			.json({ message: 'Success! Project has been created', project });
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

		for (let value in req.body) {
			if (typeof value === 'string') {
				if (req.body[value] === null || req.body[value].trim().length === 0)
					return res
						.status(400)
						.json({ message: `Content error! ${value} is empty` });

				if (value === 'title') req.body.title = req.body[value].toUpperCase();

				if (value === 'createdBy' && value)
					return res.status(401).json({
						message: `Unauthorized! Users can not change ${value} property`,
					});
			}

			if (value === 'isActive' && typeof req.body[value] !== 'boolean')
				return res
					.status(400)
					.json({ message: `Type error! ${value} must be a boolean` });
		}

		await db.getRepository(Project).update(Number(id), req.body as Project);

		return res
			.status(204)
			.json({ message: 'Success! Project has been updated' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Request error! Check console for details',
		});
	}
};

export const exclude = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: 'Content error! id is empty' });

		await db.getRepository(Project).delete(Number(id));

		return res
			.status(204)
			.json({ message: 'Success! Project has been excluded' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Request error! Check console for details',
		});
	}
};

export const list = async (_req: Request, res: Response) => {
	try {
		const projects = await db.getRepository(Project).find();

		return res
			.status(200)
			.json({ message: 'Success! Projects have been found', projects });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Request error! Check console for details',
		});
	}
};
