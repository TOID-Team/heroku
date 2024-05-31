import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Users } from './users.entity';
import { JobPostKeywords } from './job-post-keywords.entity';
import { JobPostApplications } from './job-post-applications.entity';

@Entity()
export class JobPosts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.job_posts)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar' })
  post_title: string;

  @Column({ type: 'varchar',default: 'actor' })
  post_type: string;

  @Column({ type: 'text' })
  post_content: string;

  @Column({ type: 'date' })
  post_deadline: Date;

  @Column({ type: 'varchar' })
  gender: string;
  
  @Column({ type: 'varchar',default: '기타' })
  media_type: string;
  
/*   @Column({ type: 'varchar',default: 'actor' })
  type: string; */

  @Column({ type: 'int', default: 1 })
  min_age: number;

  @Column({ type: 'int',default: 1  })
  min_height: number;

  @Column({ type: 'int', default: 250 })
  max_height: number;

  @Column({ type: 'int', default: 1 } )
  min_foot_size: number;

  @Column({ type: 'int', default: 300 } )
  max_foot_size: number;

  @Column({ type: 'int' , default: 100 })
  max_age: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'int' })
  fee: number;

  @Column({ type: 'varchar' })
  work_title: string;

  @Column({ type: 'varchar' ,default:'not_required'})
  driver_license: string;

  @Column({ type: 'varchar' })
  work_production_company: string;

  @Column({ type: 'varchar' })
  work_size: string;

  @Column({ type: 'varchar' })
  work_director: string;

  @Column({ type: 'varchar' })
  work_manager: string;

  @Column({ type: 'int', default: 0 })
  post_views: number;  

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(
    () => JobPostKeywords,
    (job_post_keywords) => job_post_keywords.job_post,
  )
  job_post_keywords: JobPostKeywords[];

  @OneToMany(
    () => JobPostApplications,
    (job_post_applications) => job_post_applications.job_post,
  )
  job_post_applications: JobPostApplications[];
}
