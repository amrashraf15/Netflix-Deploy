import { serverAuth } from "@/lib/ServerAuth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { currentUser } = await serverAuth();
        return NextResponse.json(currentUser);
    } catch (error) {
        console.error(error);
        return new NextResponse("Unauthorized", { status: 401 });
    }
}
