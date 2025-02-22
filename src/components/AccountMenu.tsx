import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
interface AccountMenuProps{
    visible?:boolean;
}

const AccountMenu:React.FC<AccountMenuProps> = ({visible}) => {
    const { data: session, status } = useSession();
    if(!visible){
        return null;
    }
return (
    <div className="bg-black w-56 absolute top-14 right-1 py-5 flex flex-col border-2 border-gray-800 ">
        <div className="flex flex-col gap-3 ">
            <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                {session?.user.image && (<div><Image src={session.user.image} alt="profile"/>  </div>)}
                <p className='text-white'>{session?.user.name}</p>
            </div>
            <hr className='bg-gray-600 border-0 h-px my-4' />
                {status === "authenticated" && session?.user && (<div onClick={() => signOut()} className='px-3 text-center text-white text-sm hover:underline hover:text-red-500 cursor-pointerx'>
                    Sign Out of Netflix 
                </div>)}
        </div>
    </div>
)
}


export default AccountMenu
