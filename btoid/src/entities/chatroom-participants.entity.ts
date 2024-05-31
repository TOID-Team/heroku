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
import { Chatrooms } from './chatrooms.entity';

@Entity()
@Unique(['user_id', 'chatroom_id'])  
export class ChatroomParticipants {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.chatroom_participants)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => Chatrooms, (chatroom) => chatroom.chatroom_participants)
  @JoinColumn({ name: 'chatroom_id' })
  chatroom: Chatrooms;

  @Column({ type: 'int' })
  chatroom_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
