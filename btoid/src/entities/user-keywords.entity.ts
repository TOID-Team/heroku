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
import { UserRepresentativeKeywords } from './user-representative-keywords.entity';

@Entity()
export class UserKeywords {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.user_keywords)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'varchar' })
  value: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(
    () => UserRepresentativeKeywords,
    (user_representative_keywords) => user_representative_keywords.keyword,
  )
  user_representative_keywords: UserRepresentativeKeywords[];
}
