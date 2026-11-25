"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import {
  Clapperboard,
  Compass,
  Search,
  Sparkles,
  ListVideo,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navigation = [
  { label: "Discover", href: "/", icon: Compass },
  { label: "Search", href: "/search", icon: Search },
  { label: "Generator", href: "/generator", icon: Sparkles },
  { label: "Lists", href: "/lists", icon: ListVideo },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const { data: session, isPending } = authClient.useSession();

  const isSignedIn = !!session?.user;

  const linkClass = (href: string) =>
    `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? "bg-accent text-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Clapperboard className="size-5" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            movie-ai<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Authentication - will be connected to Neon Auth */}
          <div className="hidden items-center gap-2 sm:flex">
            {!isPending && (
              <>
                {isSignedIn ? (
                  <Link href="/profile">
                    {session.user.name || "My profile"}
                  </Link>
                ) : (
                  <>
                    <Link href="/auth/sign-in">Sign in</Link>
                    <Link href="/auth/sign-up">Get started</Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">
            <nav className="flex flex-col gap-1">
              {navigation.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={linkClass(href)}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2 border-t border-border/60 pt-4 sm:hidden">
              {!isPending && (
                <>
                  {isSignedIn ? (
                    <Link href="/profile">
                      {session.user.name || "My profile"}
                    </Link>
                  ) : (
                    <>
                      <Link href="/auth/sign-in">Sign in</Link>
                      <Link href="/auth/sign-up">Get started</Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
