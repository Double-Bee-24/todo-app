'use client';
import { useState, useEffect, useMemo } from 'react';
import { TodoInput } from '@/components/TodoInput/TodoInput';
import { TodoItem } from '@/components/TodoItem/TodoItem';
import { TodoFilters } from '@/components/TodoFilters/TodoFilters';
import { useTodos } from '@/hooks/useTodos';

export default function Page() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'done' | 'undone'>('all');
  const [sortBy, setSortBy] = useState<'priority' | undefined>();
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  // Debounce search to avoid too many API calls
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Create filters object
  const filters = useMemo(() => ({
    search: debouncedSearch,
    status,
    sortBy,
    order,
  }), [debouncedSearch, status, sortBy, order]);

  const { todos, createTodo, deleteTodo, toggleTodo } = useTodos(filters);

  const handleTodoCreated = async (todoData: {
    title: string;
    priority?: number;
  }) => {
    try {
      await createTodo({
        title: todoData.title,
        priority: todoData.priority || 5,
      });
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const handleTodoToggle = async (id: number, is_completed: boolean) => {
    try {
      await toggleTodo(id, !is_completed);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleTodoDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  };

  const handleSortChange = (newSortBy?: 'priority', newOrder?: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setOrder(newOrder || 'asc');
  };

  const todoElements = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      title={todo.title}
      is_completed={todo.is_completed}
      priority={todo.priority}
      onToggle={handleTodoToggle}
      onDelete={handleTodoDelete}
    />
  ));

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          My Todos ({todos.length})
        </h1>
        <TodoInput onTodoCreated={handleTodoCreated} />
      </div>

      <TodoFilters
        search={search}
        status={status}
        sortBy={sortBy}
        order={order}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onSortChange={handleSortChange}
      />

      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-500 text-lg mb-2">
            {search || status !== 'all' ? 'No todos match your filters' : 'No todos yet!'}
          </div>
          <div className="text-gray-400 text-sm">
            {search || status !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Add your first todo above to get started.'
            }
          </div>
        </div>
      ) : (
        <div className="space-y-2">{todoElements}</div>
      )}
    </div>
  );
}
