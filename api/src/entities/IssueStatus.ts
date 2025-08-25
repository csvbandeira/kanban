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

	constructor(name: string, issues: Issue[]) {
		((this.name = name), (this.issues = issues));
	}
}

export default IssueStatus;
