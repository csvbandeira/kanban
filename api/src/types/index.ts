import { Issue, Project } from '../entities';

export interface UserCredentials {
	id: Number;
	name: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	projectsId: Project[];
	mencioned: Issue[];
}

export interface ProjectCredentials {
	id: Number;
	title: string;
	description: string | null;
	createdBy: Number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IssueCredentials {
	id: Number;
	title: string;
	createdBy: number;
	description: string | undefined;
	projectId: number;
	assigneesId: number[];
	statusId: number;
}

export interface IssueStatus {
	id: Number;
	name: string;
}
