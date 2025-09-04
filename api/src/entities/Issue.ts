import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Project, User, IssueStatus } from '.';

@Entity()
class Issue {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false, type: 'varchar' })
	title!: string;

	@Column({ type: 'varchar' })
	description!: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt!: Date;

	@Column({ nullable: false, type: 'int' })
	createdBy!: number;

	@ManyToOne(() => Project, (project) => project.issues)
	project!: Project;

	@ManyToMany(() => User)
	@JoinTable()
	assignees!: User[];

	@ManyToOne(() => IssueStatus, (issueStatus) => issueStatus.issues)
	@JoinTable()
	status!: IssueStatus;

	constructor(
		title: string,
		description: string = '',
		createdBy: number,
		project: Project,
		assignees: User[],
		status: IssueStatus,
	) {
		this.title = title;
		this.description = description;
		this.createdBy = createdBy;
		this.project = project;
		this.assignees = assignees;
		this.status = status;
	}
}

export default Issue;
