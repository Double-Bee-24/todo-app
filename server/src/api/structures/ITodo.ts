import { tags } from 'typia';

/**
 * Todo entity.
 */
export interface ITodo extends ICreateTodo {
  id: number & tags.Type<'int32'>;
  created_at: string & tags.Format<'date-time'>;
  updated_at: string & tags.Format<'date-time'>;
}

/**
 * Information required to create a new todo.
 */
export interface ICreateTodo {
  title: string;
  is_completed: boolean;
  priority: number & tags.Type<'int32'>;
  status: string;
}

/**
 * Information of the todo to update.
 *
 * Only the provided properties will be updated.
 */
export type IUpdateTodo = Partial<ICreateTodo>;
