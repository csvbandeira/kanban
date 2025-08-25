import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import User from './User';
import Issue from './Issue';

@Entity()
class Project {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	title!: string;

	@Column()
	description!: string;

	@Column({ nullable: false })
	createdBy!: number;

	@Column({ nullable: false })
	isActive!: boolean;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt!: Date;

	@ManyToMany(() => User, { lazy: true })
	@JoinTable()
	members!: User[];

	@OneToMany(() => Issue, (issue) => issue.project, { lazy: true })
	issues!: Issue[];

	constructor(
		title: string,
		description: string = '',
		createdBy: number,
		isActive: boolean,
		members: User[],
		issues: Issue[],
	) {
		((this.title = title),
			(this.description = description),
			(this.createdBy = createdBy),
			(this.isActive = isActive),
			(this.members = members),
			(this.issues = issues));
	}
}

export default Project;
