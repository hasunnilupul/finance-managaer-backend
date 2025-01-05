import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('profile')
@Controller({ version: '1' })
export class AppController {
  constructor() {}

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the user profile' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the user profile',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
