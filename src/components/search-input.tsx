'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from './ui/input';

type SearchInputProps = {
  placeholder: string;
};

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, 250);

  return <Input placeholder={placeholder} onChange={handleSearch} />;
};
