'use client';

import { useDebouncedCallback } from 'use-debounce';

import { Input } from './ui/input';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    250,
  );

  return (
    <Input defaultValue={value} placeholder={placeholder} onChange={handleSearch} />
  );
};
