import { Response, Request } from 'express';

import Issue from '../entities/Issue';
import { db } from '../database/connect';
import IssueStatus from '../entities/IssueStatus';
import Project from '../entities/Project';
import User from '../entities/User';

export const create = async (req: Request, res: Response) => {
	try {
		const { title, createdBy, description, projectId, assigneesId, statusId } =
			req.body;

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

		const project: Project | null = await db
			.getRepository(Project)
			.findOne({ where: { id: projectId } });

		const assignees: User[] = assigneesId.map(
			async (assigneeId: number) =>
				await db.getRepository(IssueStatus).find({ where: { id: assigneeId } }),
		);

		const status: IssueStatus | null = await db
			.getRepository(IssueStatus)
			.findOne({ where: { id: statusId } });

		if (!status)
			return res
				.status(404)
				.json({ message: 'Content error! Status was not found' });

		if (!project)
			return res
				.status(404)
				.json({ message: 'Content error! Project was not found' });

		const newProject = new Issue(
			title.toUpperCase(),
			description,
			createdBy,
			project,
			assignees ?? [],
			status,
		);

		const issue = db.getRepository(Issue).create(newProject);

		await db.getRepository(Issue).save(issue);

		return res
			.status(201)
			.json({ message: 'Success! Issue has been created', issue });
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

		for (let value in req.body as Issue) {
			if (req.body[value] === null || req.body[value].trim().length === 0)
				return res
					.status(400)
					.json({ message: `Content error! ${value} is empty` });

			if ((value === 'createdBy' && value) || (value === 'project' && value))
				return res.status(401).json({
					message: `Unauthorized! Users can not change ${value} property`,
				});

			if (value === 'title') req.body.title = req.body[value].toUpperCase();
		}

		await db.getRepository(Issue).update(Number(id), req.body as Issue);

		return res.status(204).json({ message: 'Success! Issue has been updated' });
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

		await db.getRepository(Issue).delete(Number(id));

		return res
			.status(204)
			.json({ message: 'Success! Issue has been excluded' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Request error! Check console for details',
		});
	}
};

export const list = async (_req: Request, res: Response) => {
	try {
		const projects = await db.getRepository(Issue).find();

		return res
			.status(200)
			.json({ message: 'Success! Issues have been found', projects });
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			message: 'Request error! Check console for details',
		});
	}
};
