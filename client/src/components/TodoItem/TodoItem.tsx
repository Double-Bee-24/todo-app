import type { Todo } from '@/interfaces/Todo';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';

export const TodoItem = ({ title, is_completed, priority }: Todo) => {
  return (
    <Card className="flex flex-row items-center py-3">
      <Checkbox className="ml-5 w-[30px] h-[30px] rounded-4xl" />
      <CardContent>{title}</CardContent>
    </Card>
  );
};
