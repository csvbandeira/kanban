import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Issue } from '.';

@Entity()
class IssueStatus {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false, type: 'varchar' })
	name!: string;

	@OneToMany(() => Issue, (issue) => issue.status)
	issues!: Issue[];

	constructor(name: string, issues: Issue[]) {
		((this.name = name), (this.issues = issues));
	}
}

export default IssueStatus;
