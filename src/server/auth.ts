import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface User {
        id: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId:process.env.GITHUB_ID!,
            clientSecret:process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid email or password");
                }
                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
                if (!isCorrectPassword) {
                    throw new Error("Invalid email or password");
                }
                return user;
            },
        }),
    ],
    pages: {
        signIn: "/auth",
    },
    
    debug: process.env.NODE_ENV === "development",
    adapter:PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Store user details in the token
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
                
            }
            return token;
        },
    
        async session({ session, token }) {
            // Attach user details to the session
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.image as string | null | undefined;
                
            }
            return session;
        }
    },
};

