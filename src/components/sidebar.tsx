"use client";

import {
  Activity,
  AlertTriangle,
  Calculator,
  FileText,
  Home,
  LogIn,
  LogOut,
  MessageCircle,
  Upload,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/shadcn-io/theme-switcher";
import { cn } from "@/lib/utils";
import { authClient, useSession } from "@/stores/auth-store";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Basic",
    href: "/basic",
    icon: Calculator,
  },
  {
    name: "Using GET",
    href: "/using-get",
    icon: MessageCircle,
  },
  {
    name: "Error Handling",
    href: "/error-handling",
    icon: AlertTriangle,
  },
  {
    name: "File Upload",
    href: "/file-upload",
    icon: Upload,
  },
  {
    name: "Event Iterator",
    href: "/event-iterator",
    icon: Activity,
  },
  {
    name: "Server Action",
    href: "/server-action",
    icon: Zap,
  },
  {
    name: "Docs",
    href: "/rpc",
    icon: FileText,
    external: true,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } catch (_error) {
      // Error is already logged in the store
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <div className="flex flex-col gap-1">
              <span className="block w-4 h-0.5 bg-current"></span>
              <span className="block w-4 h-0.5 bg-current"></span>
              <span className="block w-4 h-0.5 bg-current"></span>
            </div>
          )}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <button
          className="lg:hidden fixed inset-0 bg-black/50 z-40 border-none p-0"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsOpen(false);
            }
          }}
          aria-label="Close sidebar"
          type="button"
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:sticky left-0 top-0 z-40 h-screen bg-background/40 backdrop-blur-md border-r border-border/50 transition-all duration-300 ease-in-out",
          // Mobile styles
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop width (always full)
          "lg:w-64",
          // Mobile width
          "w-64",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-end lg:justify-start px-4 border-b border-border">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-foreground">
              ORPC App
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isCurrent = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isCurrent
                      ? "bg-accent text-accent-foreground"
                      : "text-slate-700 dark:text-muted-foreground",
                  )}
                  onClick={() => setIsOpen(false)} // Close mobile menu on navigation
                  {...(item.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer with auth indicator and theme switcher */}
          <div className="border-t border-border p-4 space-y-3">
            {/* Auth indicator */}
            <div className="flex items-center justify-center">
              {session ? (
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="w-full cursor-pointer"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full cursor-pointer"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Theme switcher */}
            <div className="flex items-center justify-between mt-5">
              <Link
                href="https://github.com/juji/orpc-ba-nextjs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-slate-700 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground transition-colors"
              >
                Github
              </Link>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
