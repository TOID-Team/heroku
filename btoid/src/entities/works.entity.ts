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
import { JobPostApplicationWorks } from './job-post-application-works.entity';
import { WorkImages } from './work-images.entity';

@Entity()
export class Works {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.works)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  thumbnail_url: string;

  @Column({ type: 'varchar' })
  youtube_link: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'int' })
  order: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(
    () => JobPostApplicationWorks,
    (job_post_application_works) => job_post_application_works.work,
  )
  job_post_application_works: JobPostApplicationWorks[];

  @OneToMany(() => WorkImages, (work_images) => work_images.work, { cascade: true })
  work_images: WorkImages[];
}
