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

	@Column({ nullable: false, type: 'varchar' })
	title!: string;

	@Column({ type: 'varchar' })
	description!: string;

	@Column({ nullable: false })
	createdBy!: number;

	@Column({ nullable: false, type: 'boolean' })
	isActive!: boolean;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt!: Date;

	@ManyToMany(() => User)
	@JoinTable()
	members!: User[];

	@OneToMany(() => Issue, (issue) => issue.project)
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
