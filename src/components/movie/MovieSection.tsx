import { Movie } from "@/lib/tmdb";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MovieCard from "./MovieCard";

function MovieSection({
  title,
  description,
  movies,
}: {
  title: string;
  description: string;
  movies: Movie[];
}) {
  if (!movies?.length) return null;

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        <Link
          href="/search"
          className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Explore
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
