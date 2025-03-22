'use client';

import { cloneElement } from 'react';
import { useFormStatus } from 'react-dom';
import { LucideLoaderCircle } from 'lucide-react';

import { Button } from '../ui/button';

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement & { props: { className?: string } };
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
};

const SubmitButton = ({
  label,
  icon,
  variant = 'default',
  size = 'default',
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
      {label}
      {pending
        ? null
        : icon
          ? cloneElement(icon, {
              className: 'w-4 h-4',
            })
          : null}
    </Button>
  );
};

export { SubmitButton };
