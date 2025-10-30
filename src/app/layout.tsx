import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ORPC test app",
  description:
    "A modern Next.js application with authentication powered by Better Auth and Drizzle ORM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen bg-linear-to-br from-blue-300 via-indigo-200 to-orange-200 font-sans dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
            <Sidebar />
            <main className="flex-1 lg:ml-0">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
