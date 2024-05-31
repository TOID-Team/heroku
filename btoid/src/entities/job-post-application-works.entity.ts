import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { JobPostApplications } from './job-post-applications.entity';
import { Works } from './works.entity';

@Entity()
export class JobPostApplicationWorks {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => JobPostApplications,
    (job_post_application) => job_post_application.job_post_application_works,
  )
  @JoinColumn({ name: 'job_post_application_id' })
  job_post_application: JobPostApplications;

  @Column({ type: 'int' })
  job_post_application_id: number;

  @ManyToOne(() => Works, (work) => work.job_post_application_works)
  @JoinColumn({ name: 'work_id' })
  work: Works;

  @Column({ type: 'int' })
  work_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
