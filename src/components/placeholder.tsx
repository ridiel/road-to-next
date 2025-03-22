import { cloneElement } from 'react';
import { MessageSquareWarning } from 'lucide-react';

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<{ className?: string }>;
};

export const Placeholder = ({
  label,
  icon = <MessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-2 self-center">
      {cloneElement(icon, { className: 'w-16 h-16' })}
      <h2 className="text-center text-lg">{label}</h2>
      {cloneElement(button, { className: 'h-10' })}
    </div>
  );
};
