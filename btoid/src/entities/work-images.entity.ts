import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Works } from './works.entity';
import { Users } from './users.entity'; 

@Entity()
export class WorkImages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Works, (work) => work.work_images)
  @JoinColumn({ name: 'work_id' })
  work: Works;

  @Column({ type: 'int' })
  work_id: number;

  @ManyToOne(() => Users, (user) => user.works) 
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;
  
  @Column({ type: 'varchar' })
  image_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
