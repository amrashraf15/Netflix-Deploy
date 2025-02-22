import { prisma } from "@/lib/prismadb";
import { serverAuth } from "@/lib/ServerAuth";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse favoriteIds safely from JSON field
    const favoriteIds = (currentUser.favoriteIds as string[] | null) ?? [];

    if (favoriteIds.length === 0) {
      return NextResponse.json([], { status: 200 }); // Return empty array if no favorites
    }

    // Fetch all favorite movies based on stored IDs
    const favoriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: favoriteIds,
        },
      },
    });

    return NextResponse.json(favoriteMovies, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
