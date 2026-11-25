import { imagePath, Movie } from "@/lib/tmdb";
import { Star } from "lucide-react";
import Link from "next/link";

function MovieCard({ movie }: { movie: Movie }) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <Link href={`/movie/${movie.id}`} className="group min-w-0">
      <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-muted">
        {movie.poster_path ? (
          <img
            src={`${imagePath}${movie.poster_path}`}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No poster available
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="truncate font-medium text-foreground transition-colors group-hover:text-primary">
          {movie.title}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">{year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
