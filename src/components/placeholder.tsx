import { cloneElement } from "react";
import { MessageSquareWarning } from "lucide-react";

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
    <div className="flex flex-1 h-full self-center justify-center items-center flex-col gap-y-2">
      {cloneElement(icon, { className: "w-16 h-16" })}
      <h2 className="text-lg text-center">{label}</h2>
      {cloneElement(button, { className: "h-10" })}
    </div>
  );
};
