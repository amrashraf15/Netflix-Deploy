import { prisma } from "@/lib/prismadb";
import { serverAuth } from "@/lib/ServerAuth";
import { NextResponse } from "next/server";


export async function GET(request: Request, context: { params: { movieId?: string } }) {
  try {
    await serverAuth();

    const { params } = context; // Ensure params is extracted correctly

    if (!params?.movieId || typeof params.movieId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
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

