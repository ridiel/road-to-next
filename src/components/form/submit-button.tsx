import { useFormStatus } from "react-dom";
import { LucideLoaderCircle } from "lucide-react";

import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
};

export const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending && <LucideLoaderCircle className="w-4 h-4 mr-2 animate-spin" />}
      {label}
    </Button>
  );
};
