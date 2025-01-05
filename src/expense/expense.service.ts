import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  createForUser(
    userId: number,
    createExpenseDto: CreateExpenseDto,
  ): Promise<Expense> {
    const newExpense = this.expenseRepository.create({
      ...createExpenseDto,
      userId,
    });
    return this.expenseRepository.save(newExpense);
  }

  findAllByUser(userId: number): Promise<Expense[]> {
    return this.expenseRepository.findBy({ userId });
  }

  findOneByUser(id: number, userId: number): Promise<Expense> {
    return this.expenseRepository.findOneBy({ id, userId });
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return this.expenseRepository.save({ ...expense, ...updateExpenseDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return this.expenseRepository.softDelete(id);
  }
}
