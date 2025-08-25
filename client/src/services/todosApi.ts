import type {
  ITodo,
  ICreateTodo,
  IUpdateTodo,
  ApiResponse,
} from '@/types/Todo';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class TodoApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
          `HTTP ${response.status}: ${response.statusText}`,
        );
      }

      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      return {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        success: false,
      };
    }
  }

  // GET /todos/:id
  async getTodoById(id: number): Promise<ApiResponse<ITodo>> {
    return this.request<ITodo>(`/todos/${id}`);
  }

  // POST /todos
  async createTodo(todo: ICreateTodo): Promise<ApiResponse<ITodo>> {
    return this.request<ITodo>('/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    });
  }

  // PATCH /todos/:id
  async updateTodo(
    id: number,
    updates: IUpdateTodo,
  ): Promise<ApiResponse<ITodo>> {
    return this.request<ITodo>(`/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // DELETE /todos/:id
  async deleteTodo(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/todos/${id}`, {
      method: 'DELETE',
    });
  }

  // Toggle completion status
  async toggleTodo(
    id: number,
    is_completed: boolean,
  ): Promise<ApiResponse<ITodo>> {
    return this.updateTodo(id, { is_completed });
  }

  async getAllTodos(params?: {
    search?: string;
    status?: 'all' | 'done' | 'undone';
    sortBy?: 'priority';
    order?: 'asc' | 'desc';
  }): Promise<ApiResponse<ITodo[]>> {
    const searchParams = new URLSearchParams();

    if (params?.search) searchParams.append('search', params.search);
    if (params?.status && params.status !== 'all') searchParams.append('status', params.status);
    if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params?.order) searchParams.append('order', params.order);

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/todos?${queryString}` : '/todos';

    return this.request<ITodo[]>(endpoint);
  }
}

export const todoApi = new TodoApiService();
