import { User } from './userEntity';
import { BaseEntity } from './baseEntity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('otps')
export class Otp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  otp: number;

  @Column()
  expire_at: Date;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'userid' })
  userid: User;
}
