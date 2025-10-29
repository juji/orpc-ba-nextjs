interface ThemeScriptProps {
  storageKey?: string;
  defaultTheme?: "dark" | "light" | "system";
}

export function ThemeScript({
  storageKey = "vite-ui-theme",
  defaultTheme = "system",
}: ThemeScriptProps) {
  // This script runs immediately when parsed, before React hydration
  const scriptContent = `
    try {
      const theme = localStorage.getItem('${storageKey}') || '${defaultTheme}';
      const root = document.documentElement;

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    } catch (e) {
      // Fallback to default theme
      document.documentElement.classList.add('${defaultTheme}' === 'system' ? 'light' : '${defaultTheme}');
    }
  `;

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for FOUC prevention
      dangerouslySetInnerHTML={{
        __html: scriptContent,
      }}
    />
  );
}
