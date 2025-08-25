import type { ITodo } from '@/types/Todo';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';

interface TodoItemProps extends ITodo {
  onToggle: (id: number, is_completed: boolean) => void;
  onDelete: (id: number) => void;
}

export const TodoItem = ({
  id,
  title,
  is_completed,
  priority,
  onToggle,
  onDelete,
}: TodoItemProps) => {
  return (
    <Card className="flex flex-row items-center py-3">
      <Checkbox
        id={`todo-${id}`}
        className="ml-5 w-[30px] h-[30px] rounded-4xl"
        checked={is_completed}
        onCheckedChange={() => onToggle(id, is_completed)}
      />
      <CardContent className="flex-1">
        <span className={is_completed ? 'line-through text-gray-500' : ''}>
          {title}
        </span>
      </CardContent>
      <div className="mr-4 flex items-center gap-2">
        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {priority}
        </span>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 text-sm px-2 py-1"
        >
          ×
        </button>
      </div>
    </Card>
  );
};
