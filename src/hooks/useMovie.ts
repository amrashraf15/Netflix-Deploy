import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovie = (movieId?: string) => {
  console.log("Fetching movie with ID:", movieId); // Debugging

  const { data, error, isLoading } = useSWR(
    movieId ? `/api/movies/${movieId}` : null, // Ensure correct API URL
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  console.log("API Response:", { data, error, isLoading }); // Debugging

  return { data, error, isLoading };
};

export default useMovie;
