import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Food',
    description: 'The name of the category',
  })
  name: string;

  @ApiProperty({
    example: '#FF5733',
    description: 'The color of the category',
  })
  color: string;
}
