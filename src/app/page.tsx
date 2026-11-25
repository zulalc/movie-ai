import MovieSection from "@/components/movie/MovieSection";
import {
  fetchMovies,
  fetchTopRated,
  fetchTrending,
  fetchUpcoming,
  imagePathOriginal,
} from "@/lib/tmdb";
import { ArrowRight, Play, Star } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const [trending, popular, topRated, upcoming] = await Promise.all([
    fetchTrending("week"),
    fetchMovies(1, "popularity.desc"),
    fetchTopRated(1),
    fetchUpcoming(1),
  ]);

  const featured = trending[0];

  return (
    <div className="space-y-16 pb-20">
      {/* Featured Movie */}
      {featured && (
        <section className="relative isolate min-h-130 overflow-hidden bg-muted md:min-h-150">
          {featured.backdrop_path && (
            <div
              className="absolute inset-0 -z-20 bg-cover"
              style={{
                backgroundImage: `url(${imagePathOriginal}${featured.backdrop_path})`,
                backgroundPosition: "center top",
              }}
            />
          )}

          <div className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/80 to-background/20" />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-background via-transparent to-transparent" />

          <div className="mx-auto flex min-h-130 max-w-7xl items-center px-6 py-20 md:min-h-150">
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                <span className="size-2 rounded-full bg-primary" />
                Trending this week
              </div>

              <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {featured.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {featured.release_date && (
                  <span>{new Date(featured.release_date).getFullYear()}</span>
                )}

                <span className="flex items-center gap-1">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  {featured.vote_average.toFixed(1)}
                </span>

                <span className="rounded-md border border-border px-2 py-1">
                  Movie
                </span>
              </div>

              <p className="line-clamp-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {featured.overview}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/movie/${featured.id}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Play className="size-4 fill-current" />
                  Explore movie
                </Link>

                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/50 px-6 py-3 font-medium backdrop-blur-sm transition-colors hover:bg-accent"
                >
                  Discover more
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Movie Collections */}
      <div className="mx-auto max-w-7xl space-y-16 px-6">
        <MovieSection
          title="Trending now"
          description="The movies everyone's talking about."
          movies={trending}
        />

        <MovieSection
          title="Popular movies"
          description="Popular picks worth adding to your watchlist."
          movies={popular.results}
        />

        <MovieSection
          title="Top rated"
          description="Movies that have earned their place."
          movies={topRated.results}
        />

        <MovieSection
          title="Coming soon"
          description="A first look at what's on the horizon."
          movies={upcoming.results}
        />
      </div>
    </div>
  );
}
