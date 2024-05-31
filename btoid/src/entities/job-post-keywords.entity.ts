import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { JobPosts } from './job-posts.entity';

@Entity()
export class JobPostKeywords {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobPosts, (job_post) => job_post.job_post_keywords)
  @JoinColumn({ name: 'job_post_id' })
  job_post: JobPosts;

  @Column({ type: 'int' })
  job_post_id: number;

  @Column({ type: 'varchar', nullable:true })
  keyword: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
 