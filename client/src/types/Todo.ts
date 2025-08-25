export interface ITodo {
  id: number;
  title: string;
  is_completed: boolean;
  priority: number;
}

export interface ICreateTodo {
  title: string;
  priority?: number;
}

export interface IUpdateTodo {
  title?: string;
  is_completed?: boolean;
  priority?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
