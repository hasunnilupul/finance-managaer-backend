import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @Column('user_id')
  userId: number;

  @ManyToOne(() => Category, (category) => category.expenses)
  category: Category;

  @Column('category_id')
  categoryId: number;

  @DeleteDateColumn()
  deletedAt: Date;
}
