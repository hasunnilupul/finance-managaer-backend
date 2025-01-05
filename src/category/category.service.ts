import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  createForUser(
    userId: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const newCategory = this.categoryRepository.create({
      userId: userId,
      ...createCategoryDto,
    });
    return this.categoryRepository.save(newCategory);
  }

  findAllByUser(userId: number): Promise<Category[]> {
    return this.categoryRepository.findBy({ userId });
  }

  async findOneByUser(id: number, userId: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id, userId });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.save({ ...category, ...updateCategoryDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.softDelete(id);
  }
}
