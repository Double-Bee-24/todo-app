import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import type { IUpdateTodo, ICreateTodo } from 'src/api/structures/ITodo';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: ICreateTodo) {
    const todo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(todo);
  }

  findAll() {
    return this.todoRepository.find();
  }

  findOne(id: number) {
    return this.todoRepository.findOneBy({ id });
  }

  async update(id: number, updateTodoDto: IUpdateTodo) {
    const existingTodo = await this.findOne(id);

    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    // Merge the changes
    const updatedTodo = this.todoRepository.merge(existingTodo, updateTodoDto);

    return await this.todoRepository.save(updatedTodo);
  }

  async remove(id: number) {
    await this.todoRepository.delete(id);
  }
}
