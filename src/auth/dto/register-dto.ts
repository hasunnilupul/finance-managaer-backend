import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
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
