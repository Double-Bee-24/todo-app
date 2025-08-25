import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import type { ICreateTodo, IUpdateTodo } from 'src/api/structures/ITodo';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: ICreateTodo) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: 'all' | 'done' | 'undone',
    @Query('sortBy') sortBy?: 'priority',
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.todosService.findAll(search, status, sortBy, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: IUpdateTodo) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
