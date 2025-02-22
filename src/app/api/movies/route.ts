import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { serverAuth } from "@/lib/ServerAuth";

export async function GET() {
try {
    const user = await serverAuth();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    
        const movies= await prisma.movie.findMany();
        return NextResponse.json(movies,{status:200});

    } catch (error) {
    console.error("Error fetching random movie:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
