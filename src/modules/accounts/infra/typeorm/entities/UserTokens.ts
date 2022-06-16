import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';

import User from './User';

@Entity('users_tokens')
class UserTokens {
  @PrimaryColumn()
    id: string;

  @Column()
    user_id: string;

  @ManyToOne(() => User)
  @JoinColumn()
    user: User;

  @Column()
    refresh_token: string;

  @Column()
    expiring_date: Date;

  @CreateDateColumn()
    created_at: Date;
}

export default UserTokens;
