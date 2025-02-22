import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { serverAuth } from "@/lib/ServerAuth";

export async function GET() {
  try {
    await serverAuth(); // Ensure user is authenticated

    const movieCount = await prisma.movie.count();
    if (movieCount === 0) {
      return NextResponse.json({ error: "No movies found" }, { status: 404 });
    }

    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0] ?? {});
  } catch (error) {
    console.error("Error fetching random movie:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
