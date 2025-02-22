"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const ProfileImage = ({ imageUrl, userName }: { imageUrl: string, userName: string }) => {
const router = useRouter();

const handleClick = () => {
    router.push("/"); // Redirect to the homepage
    };

return (
    <div className="group flex-row w-44 mx-auto my-4">
        <div
        className="w-44 h-44 rounded-md flex items-center justify-center border-2 overflow-hidden border-transparent group-hover:cursor-pointer group-hover:border-white"
        onClick={handleClick}
        >
        <Image src={imageUrl} alt="profile" width={200} height={200} />
    </div>
    <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {userName}
    </div>
    </div>
);
};

export default ProfileImage;

