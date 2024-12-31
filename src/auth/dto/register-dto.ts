import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name: string;

  @ApiProperty({
    example: 'jodndoe@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: '1234',
    description: 'User password',
  })
  password: string;
}
