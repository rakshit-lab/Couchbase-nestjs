import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() body: { name: string; email: string }) {
    return this.usersService.createUser(body.name, body.email);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get()
  async findAll(
  @Query('limit') limit?: string,
  @Query('offset') offset?: string
) {
    const pageLimit = limit ? parseInt(limit, 10) : 10;
    const pageOffset = offset ? parseInt(offset, 10) : 0;
    return this.usersService.findAll(pageLimit, pageOffset);
  }
}
