import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface TodoFiltersProps {
  search: string;
  status: 'all' | 'done' | 'undone';
  sortBy?: 'priority';
  order: 'asc' | 'desc';
  onSearchChange: (search: string) => void;
  onStatusChange: (status: 'all' | 'done' | 'undone') => void;
  onSortChange: (sortBy?: 'priority', order?: 'asc' | 'desc') => void;
}

export const TodoFilters = ({
  search,
  status,
  sortBy,
  order,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: TodoFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search todos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-10"
        />
      </div>

      {/* Status Filters */}
      <div className="flex gap-2">
        <span className="text-sm font-medium text-gray-700 flex items-center">
          Filter:
        </span>
        {(['all', 'done', 'undone'] as const).map((filterStatus) => (
          <Button
            key={filterStatus}
            variant={status === filterStatus ? 'default' : 'outline'}
            size="sm"
            onClick={() => onStatusChange(filterStatus)}
            className="capitalize cursor-pointer"
          >
            {filterStatus}
          </Button>
        ))}
      </div>

      {/* Sort Controls */}
      <div className="flex gap-2">
        <span className="text-sm font-medium text-gray-700 flex items-center">
          Sort:
        </span>
        <Button
          variant={sortBy === 'priority' && order === 'asc' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSortChange('priority', 'asc')}
          className='cursor-pointer'
        >
          Priority ↑
        </Button>
        <Button
          variant={sortBy === 'priority' && order === 'desc' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSortChange('priority', 'desc')}
          className='cursor-pointer'
        >
          Priority ↓
        </Button>
        <Button
          variant={!sortBy ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSortChange(undefined, undefined)}
          className='cursor-pointer'
        >
          Default
        </Button>
      </div>
    </div>
  );
};
