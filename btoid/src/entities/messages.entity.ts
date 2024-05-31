import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Users } from './users.entity';
import { Chatrooms } from './chatrooms.entity';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chatrooms, (chatroom) => chatroom.messages)
  @JoinColumn({ name: 'chatroom_id' })
  chatroom: Chatrooms;

  @Column({ type: 'int' })
  chatroom_id: number;

  @ManyToOne(() => Users, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'boolean' })
  is_deleted: boolean;
  
  @Column({ type: 'boolean', default: false })
  touched: boolean;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
