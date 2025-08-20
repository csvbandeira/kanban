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

import Project from './Project';
import User from './User';
import IssueStatus from './IssueStatus';

@Entity()
class Issue {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	title!: string;

	@Column()
	description!: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt!: Date;

	@Column({ nullable: false })
	createdBy!: number;

	@ManyToOne(() => Project, (project) => project.issues, { lazy: true })
	project!: Project;

	@ManyToMany(() => User, { lazy: true })
	@JoinTable()
	assignees!: User[];

	@ManyToOne(() => IssueStatus, (issueStatus) => issueStatus.issues, {
		lazy: true,
	})
	@JoinTable()
	status!: IssueStatus;
}

export default Issue;
