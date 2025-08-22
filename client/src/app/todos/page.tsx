// import { TodoItem } from "@/components/TodoItem/TodoItem";
import { TodoItem } from '@/components/TodoItem/TodoItem';
import type { Todo } from '@/interfaces/Todo';

const todos: Todo[] = [
  { id: 1, title: 'Buy groceries', is_completed: false, priority: 5 },
  { id: 2, title: 'Walk the dog', is_completed: true, priority: 3 },
  { id: 3, title: 'Finish homework', is_completed: false, priority: 8 },
  { id: 4, title: 'Read a book', is_completed: true, priority: 2 },
  { id: 5, title: 'Clean the kitchen', is_completed: false, priority: 6 },
  { id: 6, title: 'Call mom', is_completed: false, priority: 7 },
  { id: 7, title: 'Pay bills', is_completed: true, priority: 9 },
  { id: 8, title: 'Exercise', is_completed: false, priority: 4 },
  { id: 9, title: 'Meditate', is_completed: true, priority: 1 },
  { id: 10, title: 'Prepare dinner', is_completed: false, priority: 5 },
];

export default function Page() {
  const todoElements = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      is_completed={todo.is_completed}
      title={todo.title}
      priority={todo.priority}
    />
  ));

  return (
    <div className="container mx-auto px-4 flex flex-col gap-4">
      {todoElements}
    </div>
  );
}
