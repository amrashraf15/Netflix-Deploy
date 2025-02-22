import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth"; // Import your NextAuth config options
import { prisma } from "@/lib/prismadb";

export const serverAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};
