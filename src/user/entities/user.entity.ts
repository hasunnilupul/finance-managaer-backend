import { Category } from 'src/category/entities/category.entity';
import { Expense } from 'src/expense/entities/expense.entity';
import { hashPassword } from 'src/lib/utils';
import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @DeleteDateColumn({})
  deletedAt: Date;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @BeforeInsert()
  async beforeInsert() {
    // hash password before saving
    this.password = await hashPassword(this.password);
  }
}
