"use client";

import { useRouter } from 'next/navigation';
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs';

interface PlayButtonProps{
    movieId:string
}

const PlayButton:React.FC<PlayButtonProps> = ({movieId}) => {
    const router=useRouter();
  return (
    <button
        onClick={()=>router.push(`/watch/${movieId}`)}
        className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs md:text-lg font-semibold flex flex-row items-center gap-1 hover:bg-neutral-300 transition">
        <BsFillPlayFill   size={25}/>
        Play
    </button>
  )
}

export default PlayButton
