import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

// --------------------------------------------------
// Types
// --------------------------------------------------

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
}

export interface Person {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  birthday: string | null;
  place_of_birth: string | null;
  known_for_department: string;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Videos {
  id: number;
  results: Video[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

// --------------------------------------------------
// Trending Movies
// --------------------------------------------------

export const fetchTrending = async (timeWindow: "day" | "week" = "day") => {
  const { data } = await tmdb.get<TMDBResponse<Movie>>(
    `/trending/movie/${timeWindow}`,
  );

  return data.results;
};

export const fetchTopRated = async (page: number = 1) => {
  const { data } = await tmdb.get<TMDBResponse<Movie>>("/movie/top_rated", {
    params: { page },
  });

  return data;
};

export const fetchUpcoming = async (page: number = 1) => {
  const { data } = await tmdb.get<TMDBResponse<Movie>>("/movie/upcoming", {
    params: { page },
  });

  return data;
};

// --------------------------------------------------
// Movie Details
// --------------------------------------------------

export const fetchDetails = async (id: number) => {
  const { data } = await tmdb.get<Movie>(`/movie/${id}`);

  return data;
};

// --------------------------------------------------
// Movie Credits
// --------------------------------------------------

export const fetchCredits = async (id: number) => {
  const { data } = await tmdb.get<Credits>(`/movie/${id}/credits`);

  return data;
};

// --------------------------------------------------
// Movie Videos
// --------------------------------------------------

export const fetchVideos = async (id: number) => {
  const { data } = await tmdb.get<Videos>(`/movie/${id}/videos`);

  return data;
};

// --------------------------------------------------
// Browse Movies
// --------------------------------------------------

export const fetchMovies = async (
  page: number = 1,
  sortBy: string = "popularity.desc",
) => {
  const { data } = await tmdb.get<TMDBResponse<Movie>>("/discover/movie", {
    params: { page, sort_by: sortBy },
  });

  return data;
};

// --------------------------------------------------
// Search Movies
// --------------------------------------------------

export const searchMovies = async (query: string, page: number = 1) => {
  const { data } = await tmdb.get<TMDBResponse<Movie>>("/search/movie", {
    params: { query, page },
  });

  return data;
};

// --------------------------------------------------
// Person Details
// --------------------------------------------------

export const fetchPerson = async (id: number) => {
  const { data } = await tmdb.get<Person>(`/person/${id}`);

  return data;
};

// --------------------------------------------------
// Person's Movies
// --------------------------------------------------

export const fetchPersonMovies = async (id: number) => {
  const { data } = await tmdb.get<{
    cast: Movie[];
    crew: Movie[];
  }>(`/person/${id}/movie_credits`);

  return data;
};
