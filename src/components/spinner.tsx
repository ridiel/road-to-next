import { LoaderCircle } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="flex flex-1 flex-col self-center items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin" />
    </div>
  );
};
