import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';

import Project from './Project';
import Issue from './Issue';

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	name!: string;

	@Column({ nullable: false })
	isActive!: boolean;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt!: Date;

	@ManyToMany(() => Project, { lazy: true })
	@JoinTable()
	projects!: Project[];

	@ManyToMany(() => Issue, { lazy: true })
	@JoinTable()
	mencioned!: Issue[];
}

export default User;
