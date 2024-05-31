import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Users } from './users.entity';
import { JobPosts } from './job-posts.entity';
import { JobPostApplicationWorks } from './job-post-application-works.entity';

@Entity()
@Unique(['user_id', 'job_post_id'])
export class JobPostApplications {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.job_post_applications)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => JobPosts, (job_post) => job_post.job_post_applications)
  @JoinColumn({ name: 'job_post_id' })
  job_post: JobPosts;

  @Column({ type: 'int' })
  job_post_id: number;

  @Column({ type: 'varchar' })
  introduction: string;

  @Column({ type: 'varchar' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;

  @Column({ type: 'int' })
  grade: number;

  @OneToMany(
    () => JobPostApplicationWorks,
    (job_post_application_works) =>
      job_post_application_works.job_post_application,
  )
  job_post_application_works: JobPostApplicationWorks[];
}
