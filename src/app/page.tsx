
import Billboard from "@/components/Billboard";
import FAQList from "@/components/FAQList";
import Favorites from "@/components/Favorites";
import InfoModalClient from "@/components/InfoModalClient";


import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import { authOptions } from "@/server/auth";
import getMovies from "@/server/getMovies";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth"); // Redirect if not signed in
  }
  const movies = await getMovies();
  return (
    <div className="">
      <InfoModalClient/>
      <Navbar/>
      <Billboard/>
      <div className="pb-30">
      <MovieList title="Trending Now" data={movies}/>
      <Favorites/>
      <FAQList/>
      </div> 
    </div>
  );
}
