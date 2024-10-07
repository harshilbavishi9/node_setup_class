import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  token: string;
}
