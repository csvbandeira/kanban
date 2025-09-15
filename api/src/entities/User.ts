import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';

import { Project, Issue } from '.';

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false, type: 'varchar' })
	name!: string;

	@Column({ nullable: false, type: 'bool' })
	isActive!: boolean;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt!: Date;

	@ManyToMany(() => Project, { cascade: true, eager: true })
	@JoinTable()
	projects!: Project[];

	@ManyToMany(() => Issue, { cascade: true })
	@JoinTable()
	mencioned!: Issue[];

	constructor(
		name: string,
		isActive: boolean,
		projects: Project[],
		mencioned: Issue[],
	) {
		((this.name = name),
			(this.isActive = isActive),
			(this.projects = projects),
			(this.mencioned = mencioned));
	}
}

export default User;
