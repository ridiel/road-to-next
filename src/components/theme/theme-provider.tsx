import { PropsWithChildren } from "react";
import { ThemeProvider as BaseThemeProvider } from "next-themes";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <BaseThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </BaseThemeProvider>
  );
};
