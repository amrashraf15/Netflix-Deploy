import { prisma } from "@/lib/prismadb";


export default async function getMovies() {
  return await prisma.movie.findMany(); 
}