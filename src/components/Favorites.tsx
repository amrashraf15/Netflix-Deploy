    "use client"; 

import useFavorites from "@/hooks/useFavorites";
import MovieList from "@/components/MovieList";

export default function Favorites() {
  const { data: favorites, isLoading, error } = useFavorites();

  if (isLoading) return <p>Loading favorites...</p>;
  if (error) return <p>Failed to load favorites.</p>;

  return <MovieList title="My List" data={favorites} />;
}
