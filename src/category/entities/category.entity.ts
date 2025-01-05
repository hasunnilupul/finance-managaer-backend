import { Expense } from 'src/expense/entities/expense.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @Column('user_id')
  userId: number;
}
