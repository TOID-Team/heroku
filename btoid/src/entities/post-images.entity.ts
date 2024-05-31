import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Posts } from './posts.entity';
import { Users } from './users.entity';
@Entity()
export class PostImages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Posts, (post) => post.post_images)
  @JoinColumn({ name: 'post_id' })
  post: Posts;

  @Column({ type: 'int' })
  post_id: number;

  @ManyToOne(() => Users, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: Users;  

  @Column({ type: 'int' })
  user_id: number;


  @Column({ type: 'varchar' })
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;


}
