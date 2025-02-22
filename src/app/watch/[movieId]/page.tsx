"use client";
import useMovie from "@/hooks/useMovie";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const params = useParams(); 

  console.log("Params object:", params); // Debugging
  const movieId = params?.movieId as string; // Extract movieId correctly

  console.log("Extracted movieId:", movieId); // Debugging

  // Prevent fetching if movieId is undefined
  const { data, error, isLoading } = useMovie(movieId || "");

  if (isLoading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error loading movie.</p>;
  if (!data) return <p className="text-gray-500 text-center">Movie not found.</p>;

  return (
    <div className="w-screen h-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          size={30}
          className="text-white cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {data.title}
        </p>
      </nav>
      <video autoPlay controls className="w-full h-full" src={data?.videoUrl} />
    </div>
  );
};

export default Watch;




