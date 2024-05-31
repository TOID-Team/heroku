import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserSns } from './user-sns.entity';
import { UserLikes } from './user-likes.entity';
import { UserKeywords } from './user-keywords.entity';
import { ChatroomParticipants } from './chatroom-participants.entity';
import { JobPosts } from './job-posts.entity';
import { Posts } from './posts.entity';
import { Works } from './works.entity';
import { PostLikes } from './post-likes.entity';
import { UserGuestbooks } from './user-guestbooks.entity';
import { PostComments } from './post-comments.entity';
import { Messages } from './messages.entity';
import { JobPostApplications } from './job-post-applications.entity';
import { UserVisitorLog } from './user-visitor-log.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text',unique:true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ nullable: true })
  agency: string | null;

  @Column({ nullable: true })
  drivers_license: string | null;

  @Column({ nullable: true })
  type: string | null;

  @Column({ nullable: true })
  location: string | null;

  @Column({ nullable: true })
  name: string | null;

  @Column({ nullable: true })
  birthDate: Date | null;

  @Column({ nullable: true })
  gender: string| null;

  @Column({ nullable: true })
  race: string| null;

  @Column({ nullable: true })
  introduction: string | null;

  @Column({ nullable: true })
  height: number | null;


  @Column({ nullable: true })
  weight: number | null;

  @Column({ nullable: true })
  footSize: number | null;

  @Column({ nullable: true })
  fee: number | null;

  @Column({ nullable: true })
  can_negotiate_fee: boolean | null;

  @Column({ nullable: true })
  can_poomasi: boolean | null;

  @Column({ nullable: true })
  representative_work: string| null;

  @Column({ nullable: true })
  filmography: string| null;

  @Column({ nullable: true })
  provider: string| null;

  @Column({ nullable: true })
  profileImageURL: string | null;

  @Column({ nullable: true })
  monolog_video_url: string | null;

  @Column({ nullable: true })
  prpfileScrollTop: number | null;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => UserSns, (user_sns) => user_sns.user)
  user_sns: UserSns[];

  @OneToMany(() => UserLikes, (user_likes) => user_likes.user)
  user_likes: UserLikes[];

  @OneToMany(() => UserKeywords, (user_keywords) => user_keywords.user)
  user_keywords: UserKeywords[];

  @OneToMany(
    () => ChatroomParticipants,
    (chatroom_participants) => chatroom_participants.user,
  )
  chatroom_participants: ChatroomParticipants[];

  @OneToMany(() => JobPosts, (job_posts) => job_posts.user)
  job_posts: JobPosts[];

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];

  @OneToMany(() => Works, (works) => works.user)
  works: Works[];

  @OneToMany(() => PostLikes, (post_likes) => post_likes.user)
  post_likes: PostLikes[];

  @OneToMany(() => UserGuestbooks, (user_guestbooks) => user_guestbooks.user)
  user_guestbooks: UserGuestbooks[];

  @OneToMany(() => PostComments, (post_comments) => post_comments.user)
  post_comments: PostComments[];

  @OneToMany(() => Messages, (messages) => messages.user)
  messages: Messages[];

  @OneToMany(
    () => JobPostApplications,
    (job_post_applications) => job_post_applications.user,
  )
  job_post_applications: JobPostApplications[];

  @OneToMany(
    () => UserVisitorLog,
    (user_visitor_logs) => user_visitor_logs.user,
  )
  user_visitor_logs: UserVisitorLog[];
}
