'use client';

import { useQueryStates } from 'nuqs';

import { sortOptions, sortParser } from '@/features/ticket/search-params';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type SortSelectProps = {
  options: Option[];
};

type Option = {
  label: string;
  sortKey: string;
  sortValue: string;
};

export const SortSelect = ({ options }: SortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split('_');

    setSort({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select onValueChange={handleSort} defaultValue={`${sort.sortKey}_${sort.sortValue}`}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={`${option.sortKey}_${option.sortValue}`}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
