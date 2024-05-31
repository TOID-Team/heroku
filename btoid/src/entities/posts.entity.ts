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
import { PostLikes } from './post-likes.entity';
import { PostComments } from './post-comments.entity';
import { PostImages } from './post-images.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'boolean',nullable: true })
  is_anonymous: boolean;


  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

 

  @OneToMany(() => PostLikes, (post_likes) => post_likes.post)
  post_likes: PostLikes[];

  @OneToMany(() => PostComments, (post_comments) => post_comments.post)
  post_comments: PostComments[];

  @OneToMany(() => PostImages, (post_images) => post_images.post)
  post_images: PostImages[];
}
