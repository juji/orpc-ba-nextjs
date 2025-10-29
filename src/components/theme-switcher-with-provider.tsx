"use client";

import { useTheme } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/ui/shadcn-io/theme-switcher";

interface ThemeSwitcherWithProviderProps {
  className?: string;
}

export function ThemeSwitcherWithProvider({
  className,
}: ThemeSwitcherWithProviderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeSwitcher value={theme} onChange={setTheme} className={className} />
  );
}
