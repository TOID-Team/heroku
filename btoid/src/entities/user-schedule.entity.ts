import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
  Unique
} from 'typeorm';

import { Users } from './users.entity';
import { UserLikes } from './user-likes.entity';
import { UserGuestbooks } from './user-guestbooks.entity';
import { UserVisitorLog } from './user-visitor-log.entity';


@Entity()
@Unique(['user_id', 'date'])  

export class UserSchedule  {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.user_sns)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => UserLikes, (user_likes) => user_likes.profile)
  user_likes: UserLikes[];

  @OneToMany(() => UserGuestbooks, (user_guestbooks) => user_guestbooks.profile)
  user_guestbooks: UserGuestbooks[];

  @OneToMany(
    () => UserVisitorLog,
    (user_visitor_logs) => user_visitor_logs.profile,
  )
  user_visitor_logs: UserVisitorLog[];
}
