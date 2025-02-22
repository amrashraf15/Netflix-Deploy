import { prisma } from '@/lib/prismadb';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const { email, name, password } = await req.json();
        if (!email || !name || !password) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return new Response(JSON.stringify({ error: 'Email already taken' }), { status: 422 });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
                favoriteIds: [], // Ensure proper array initialization
            },
        });

        return new Response(JSON.stringify(user), { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
