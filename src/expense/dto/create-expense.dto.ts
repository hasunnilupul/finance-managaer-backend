import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    example: '100.05',
    description: 'The amount of money',
  })
  amount: number;

  @ApiProperty({
    example: '2024/12/30',
    description: 'The date of the expense',
  })
  date: Date;

  @ApiProperty({
    example: 'Uber Eats',
    description: 'Small description of the expense',
  })
  description: string;

  @ApiProperty({
    example: '1',
    description: 'The id of the expense category',
  })
  categoryId: number;
}
