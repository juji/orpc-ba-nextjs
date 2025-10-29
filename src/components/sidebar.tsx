"use client";

import { Database, Home, Settings, Shield, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/shadcn-io/theme-switcher";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    current: true,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    current: false,
  },
  {
    name: "Database",
    href: "/database",
    icon: Database,
    current: false,
  },
  {
    name: "Security",
    href: "/security",
    icon: Shield,
    current: false,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    current: false,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

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
          "fixed left-0 top-0 z-40 h-screen bg-background border-r border-border transition-all duration-300 ease-in-out",
          // Mobile styles
          "lg:translate-x-0 lg:static lg:z-auto",
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
            <h2 className="text-lg font-semibold">ORPC App</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    item.current
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground",
                  )}
                  onClick={() => setIsOpen(false)} // Close mobile menu on navigation
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Footer with theme switcher */}
          <div className="border-t border-border p-4">
            <div className="flex items-center justify-center">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
