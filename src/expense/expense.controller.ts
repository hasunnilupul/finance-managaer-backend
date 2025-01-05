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
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Expense } from './entities/expense.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('expenses')
@ApiBearerAuth()
@Controller({ version: '1', path: 'expenses' })
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiBody({ type: CreateExpenseDto, required: true })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new expense',
    type: Expense,
  })
  create(@Request() req, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.createForUser(req.user?.id, createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all expenses',
    type: Array<Expense>,
  })
  findAll(@Request() req) {
    return this.expenseService.findAllByUser(req.user?.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an expnese by ID' })
  @ApiParam({ name: 'id', description: 'Expense ID', required: true })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved an expnese',
    type: Expense,
  })
  @ApiResponse({
    status: 404,
    description: 'Expense not found',
  })
  findOne(@Request() req, @Param('id') id: string) {
    return this.expenseService.findOneByUser(+id, req.user?.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense by ID' })
  @ApiParam({ name: 'id', description: 'Expense ID', required: true })
  @ApiBody({ type: UpdateExpenseDto, required: true })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated an expense',
    type: Expense,
  })
  @ApiResponse({
    status: 404,
    description: 'Expense not found',
  })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense by ID' })
  @ApiParam({ name: 'id', description: 'Expense ID', required: true })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted an expense',
  })
  @ApiResponse({
    status: 404,
    description: 'Expense not found',
  })
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
