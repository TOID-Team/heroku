import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

import { Users } from './users.entity';
import { UserSns } from './user-sns.entity';

@Entity()
@Unique(['user_id', 'profile_id'])  
export class UserLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (profile) => profile.user_likes)
  @JoinColumn({ name: 'profile_id' })
  profile: Users;

  @Column({ type: 'int' })
  profile_id: number;

  @ManyToOne(() => Users, (user) => user.user_likes)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
