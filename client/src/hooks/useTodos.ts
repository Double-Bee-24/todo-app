import useSWR from 'swr';
import { todoApi } from '@/services/todosApi';
import type { IUpdateTodo, ICreateTodo } from '@/types/Todo';

interface TodoFilters {
  search?: string;
  status?: 'all' | 'done' | 'undone';
  sortBy?: 'priority';
  order?: 'asc' | 'desc';
}

export function useTodos(filters?: TodoFilters) {
  const { data, error, isLoading, mutate } = useSWR(
    ['todos', filters],
    async () => {
      const response = await todoApi.getAllTodos(filters);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data || [];
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  const createTodo = async (todo: ICreateTodo) => {
    const response = await todoApi.createTodo(todo);
    if (response.success) {
      mutate(); // Revalidate the todos list
    }
    return response;
  };

  const updateTodo = async (id: number, updates: IUpdateTodo) => {
    const response = await todoApi.updateTodo(id, updates);
    if (response.success) {
      mutate(); // Revalidate the todos list
    }
    return response;
  };

  const deleteTodo = async (id: number) => {
    const response = await todoApi.deleteTodo(id);
    if (response.success) {
      mutate(); // Revalidate the todos list
    }
    return response;
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    const response = await todoApi.toggleTodo(id, completed);
    if (response.success) {
      mutate(); // Revalidate the todos list
    }
    return response;
  };

  return {
    todos: data || [],
    isLoading,
    error: error?.message,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refetch: mutate,
  };
}
