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
    const todo = this.todoRepository.create({
      ...createTodoDto,
      is_completed: false,
      status: 'undone',
    });
    return await this.todoRepository.save(todo);
  }

  async findAll(
    search?: string,
    status?: 'all' | 'done' | 'undone',
    sortBy?: 'priority',
    order?: 'asc' | 'desc',
  ) {
    const queryBuilder = this.todoRepository.createQueryBuilder('todo');

    // Search by title
    if (search) {
      queryBuilder.andWhere('todo.title ILIKE :search', {
        search: `%${search}%`,
      });
    }

    // Filter by status
    if (status && status !== 'all') {
      const isCompleted = status === 'done';
      queryBuilder.andWhere('todo.is_completed = :isCompleted', {
        isCompleted,
      });
    }

    // Sort by priority
    if (sortBy === 'priority') {
      const orderDirection = order === 'desc' ? 'DESC' : 'ASC';
      queryBuilder.orderBy('todo.priority', orderDirection);
    } else {
      // Default sort by id
      queryBuilder.orderBy('todo.id', 'DESC');
    }

    return await queryBuilder.getMany();
  }

  findOne(id: number) {
    return this.todoRepository.findOneBy({ id });
  }

  async update(id: number, updateTodoDto: IUpdateTodo) {
    const existingTodo = await this.findOne(id);
    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    // Update status based on is_completed
    const updatedData = { ...updateTodoDto };
    if (typeof updateTodoDto.is_completed === 'boolean') {
      updatedData.status = updateTodoDto.is_completed ? 'done' : 'undone';
    }

    const updatedTodo = this.todoRepository.merge(existingTodo, updatedData);
    return await this.todoRepository.save(updatedTodo);
  }

  async remove(id: number) {
    await this.todoRepository.delete(id);
    return { success: true, message: 'Todo deleted successfully' };
  }
}
