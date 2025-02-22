import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { serverAuth } from "@/lib/ServerAuth";

export async function GET(
  req: NextRequest,
  { params }: { params: { movieId: string } } // Removed the optional '?'
) {
  try {
    await serverAuth();

    const { movieId } = params; // Destructure movieId directly

    if (!movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
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