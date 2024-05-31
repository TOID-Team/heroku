import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Users } from './users.entity';


@Entity()
export class UserGuestbooks {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (profile) => profile.user_guestbooks)
  @JoinColumn({ name: 'profile_id' })
  profile: Users;

  @Column({ type: 'int' })
  profile_id: number;

  @ManyToOne(() => Users, (user) => user.user_guestbooks)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar' })
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
