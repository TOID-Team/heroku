import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { ChatroomParticipants } from './chatroom-participants.entity';
import { Messages } from './messages.entity';

@Entity()
export class Chatrooms {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(
    () => ChatroomParticipants,
    (chatroom_participants) => chatroom_participants.chatroom,
  )
  chatroom_participants: ChatroomParticipants[];

  @OneToMany(() => Messages, (messages) => messages.chatroom)
  messages: Messages[];
}
