import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'JWT token',
  })
  access_token: string;
}
