import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, PaginationDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('/search/:keyword')
  findSearch(@Param('keyword') keyword: string) {
    return this.usersService.findSearch(keyword);
  }

  @Get('/pagination')
  pagination(@Query() input: PaginationDto) {
    return this.usersService.pagination(input.page, input.limit);
  }

  @Get('/parctice/:id/:name')
  parctice(@Param('id') id: string, @Param('name') name: string) {
    return this.usersService.parctice(id, name);
  }
}
