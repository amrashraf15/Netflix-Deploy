import { prisma } from "@/lib/prismadb";
import { serverAuth } from "@/lib/ServerAuth";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { movieId?: string };
}

export async function GET(req: NextRequest, context: Context) {
  try {
    await serverAuth();

    const { movieId } = context.params;

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



