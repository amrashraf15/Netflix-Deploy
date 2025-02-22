"use client";

import useMovieList from "@/hooks/useMovieList";
import MovieList from "@/components/MovieList";

interface MovieListClientProps {
title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movies: any[]; // Adjust type based on data structure
}

export default function MovieListClient({ title, movies }: MovieListClientProps) {
  const { data: clientMovies = [] } = useMovieList(); // Fetch data on the client

  const allMovies = clientMovies.length > 0 ? clientMovies : movies; // Fallback to server data

  return <MovieList title={title} data={allMovies} />;
}
