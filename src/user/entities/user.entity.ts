import { hashPassword } from 'src/lib/utils';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async beforeInsert() {
    // Hash password before saving
    this.password = await hashPassword(this.password);
  }
}
