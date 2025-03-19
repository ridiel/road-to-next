import { RedirectToast } from "@/components/redirect-toast";

type TemplateProps = {
  children: React.ReactNode;
};

export default function Template({ children }: TemplateProps) {
  return (
    <>
      <>{children}</>
      <RedirectToast />
    </>
  );
}
