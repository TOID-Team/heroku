import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Users } from './users.entity';
import { Posts } from './posts.entity';

@Entity()
export class PostComments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.post_comments)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => Posts, (post) => post.post_comments)
  @JoinColumn({ name: 'post_id' })
  post: Posts;

  @Column({ type: 'int' })
  post_id: number;

  @Column({ type: 'varchar' })
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
