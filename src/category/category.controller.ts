import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('categories')
@ApiBearerAuth()
@Controller({ version: '1', path: 'categories' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto, required: true })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new category',
    type: Category,
  })
  create(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createForUser(req.user?.id, createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all categories',
    type: Array<Category>,
  })
  findAll(@Request() req) {
    return this.categoryService.findAllByUser(req.user?.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID', required: true })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved a category',
    type: Category,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  findOne(@Request() req, @Param('id') id: string) {
    return this.categoryService.findOneByUser(+id, req.user?.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID', required: true })
  @ApiBody({ type: UpdateCategoryDto, required: true })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated a category',
    type: Category,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID', required: true })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted a category',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);
  }
}
