import fetcher from "@/lib/fetcher"
import useSWR from "swr"


const useFavorites = () => {
    const {data,error,isLoading,mutate}=useSWR('/api/favorites',fetcher,{
        revalidateOnFocus:false,
        revalidateIfStale:false,
        revalidateOnReconnect:false,
    });
    return{
        data,
        error,
        isLoading,
        mutate
    }
};
export default useFavorites;