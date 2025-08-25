import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onTodoCreated: (todoData: { title: string; priority?: number }) => void;
}

export const TodoInput = ({ onTodoCreated }: TodoInputProps) => {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onTodoCreated({
        title: value.trim(),
        priority: priority
      });
      setValue('');
      setPriority(5); // Reset to default
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col gap-3">
        {/* Title Input */}
        <Input
          className="h-14 w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 placeholder:text-sm transition-all duration-200"
          placeholder="Add a new task..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Priority Selection */}
        <div className="flex items-center gap-3 px-2">
          <span className="text-sm font-medium text-gray-600 min-w-fit">
            Priority:
          </span>

          {/* Priority Buttons */}
          <div className="flex gap-1 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPriority(num)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 ${priority === num
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Priority Indicator */}
          <span className="text-sm text-gray-500 ml-2">
            {priority <= 3 ? '🔥 High' : priority <= 7 ? '📋 Medium' : '🌱 Low'}
          </span>

          {/* Add Button */}
          <Button
            type="submit"
            disabled={!value.trim()}
            className="ml-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </form>
  );
};
