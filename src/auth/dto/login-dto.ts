import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
