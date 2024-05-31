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
import { Posts } from './posts.entity';

@Entity()
@Unique(['user_id', 'post_id'])  
export class PostLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.post_likes)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => Posts, (post) => post.post_likes)
  @JoinColumn({ name: 'post_id' })
  post: Posts;

  @Column({ type: 'int' })
  post_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
