import { prisma } from "@/lib/prismadb";
import { serverAuth } from "@/lib/ServerAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { movieId: string } }) {
  try {
    await serverAuth();

    // Ensure movieId exists and is a valid string
    if (!params.movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: params.movieId },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


