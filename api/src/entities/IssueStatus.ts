import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Issue from './Issue';

@Entity()
class IssueStatus {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	name!: string;

	@OneToMany(() => Issue, (issue) => issue.status, { lazy: true })
	issues!: Issue[];
}

export default IssueStatus;
