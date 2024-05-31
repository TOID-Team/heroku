import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Users } from './users.entity';
import { UserSns } from './user-sns.entity';

@Entity()
export class UserVisitorLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (profile) => profile.user_visitor_logs)
  @JoinColumn({ name: 'profile_id' })
  profile: Users;

  @Column({ type: 'int' })
  profile_id: number;

  @ManyToOne(() => Users, (user) => user.user_visitor_logs)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
