  import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Users } from './users.entity';
import { UserKeywords } from './user-keywords.entity';

@Entity()
export class UserRepresentativeKeywords {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.user_keywords)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(
    () => UserKeywords,
    (keyword) => keyword.user_representative_keywords,
  )
  @JoinColumn({ name: 'keyword_id' })
  keyword: UserKeywords;

  @Column({ type: 'int' })
  keyword_id: number;

  /*
  @Column({ type: 'varchar' })
  value: string;*/

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
