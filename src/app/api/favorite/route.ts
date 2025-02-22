import { prisma } from "@/lib/prismadb";
import { serverAuth } from "@/lib/ServerAuth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
try {
    const body = await req.json(); // Parse request body
    const { movieId } = body;

    const { currentUser } = await serverAuth();

    if (!movieId) {
        return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }

    const existingMovie = await prisma.movie.findUnique({
    where: { id: movieId },
    });

    if (!existingMovie) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 404 });
    }

    // Fetch current favoriteIds (since it's stored as JSON)
    const user = await prisma.user.findUnique({
      where: { email: currentUser.email || "" },
      select: { favoriteIds: true },
    });

    const currentFavorites = Array.isArray(user?.favoriteIds) ? user.favoriteIds : [];

    // Add new movieId if not already in favorites
    if (!currentFavorites.includes(movieId)) {
      currentFavorites.push(movieId);
    }

    // Update user's favorites
    const updatedUser = await prisma.user.update({
      where: { email: currentUser.email || "" },
      data: { favoriteIds: currentFavorites },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
export async function DELETE(req: Request) {
    try {
      const body = await req.json();
      const { movieId } = body;
      const { currentUser } = await serverAuth();
  
      if (!movieId) {
        return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
      }
  
      // Get the current favorite movies
      const user = await prisma.user.findUnique({
        where: { email: currentUser.email || "" },
        select: { favoriteIds: true },
      });
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      const currentFavorites = Array.isArray(user.favoriteIds) ? user.favoriteIds : [];
  
      // Remove the movie from favorites using filter (instead of lodash.without)
      const updatedFavorites = currentFavorites.filter((id) => id !== movieId);
  
      // Update user's favorites
      const updatedUser = await prisma.user.update({
        where: { email: currentUser.email || "" },
        data: { favoriteIds: updatedFavorites },
      });
  
      return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
      console.error("Error in DELETE handler:", error);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  }

