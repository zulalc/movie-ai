import Link from "next/link";
import { Clapperboard, Heart } from "lucide-react";
import { GitHub } from "@better-auth-ui/react";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Discover", href: "/" },
      { label: "Search movies", href: "/search" },
      { label: "Movie generator", href: "/generator" },
    ],
  },
  {
    title: "Your space",
    links: [
      { label: "My lists", href: "/lists" },
      { label: "Watchlist", href: "/watchlist" },
      { label: "Favorites", href: "/favorites" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Explore profiles", href: "/community" },
      { label: "About cinema.", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Clapperboard className="size-5" />
              </div>

              <span className="text-xl font-bold tracking-tight">
                movie-ai<span className="text-primary">.</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              A little corner for movie lovers. Discover films, build your
              collections, and find your next favorite story.
            </p>
          </div>

          {/* Footer links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold">{group.title}</h3>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} movie-ai. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Made with <Heart className="size-3 fill-primary text-primary" /> for
            movie lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
