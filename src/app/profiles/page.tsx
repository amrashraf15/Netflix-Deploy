import ProfileImage from "@/components/ProfileImage";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const Profiles = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/auth"); // Redirect if not logged in
    }
return (
    <div className="flex items-center justify-center h-full mt-20">
      <div className="flex flex-col">
          <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
          <div className="flex items-center justify-center gap-8 10">
            <div > 
              <ProfileImage imageUrl="/images/blueFace.png" userName={session.user.name || "Guest"}/>
            </div>
          </div>
      </div>
    </div>
)
}

export default Profiles
