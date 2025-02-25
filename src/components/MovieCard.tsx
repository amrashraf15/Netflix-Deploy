"use client"
import Image from 'next/image';
import React, { useCallback } from 'react'
import { BsFillPlayFill } from 'react-icons/bs';
import FavoriteButton from './FavoriteButton';
import { useRouter } from 'next/navigation';
import useInfoModal from '@/hooks/useInfoModal';
import { BiChevronDown } from 'react-icons/bi';


    
interface MovieCardProps {
    data: {
      id: string;
      thumbnailUrl: string;
      duration: string;
      genre: string; // Fixed typo (was "genere")
    };
  }


const MovieCard:React.FC<MovieCardProps> = ({ data }) => {
    const router=useRouter();
    const { openModal } = useInfoModal();
    const handleOpenModal = useCallback(() => {
            if (data?.id) {
                openModal(data.id);
            }
        }, [openModal, data?.id]);
return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]" >
        <Image width={400} height={350} unoptimized  className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]" 
        src={data.thumbnailUrl} alt="thumbnail"/>
        <div className="opacity-0 absolute top-0  transition duration-300 z-10 invisible
            sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
                <Image width={400} height={350} unoptimized className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]" 
        src={data.thumbnailUrl} alt="thumbnail"/>
        <div className="z-10 bg-zinc-900 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
            <div className='flex flex-row items-center gap-3'>
                <div onClick={()=>router.push(`/watch/${data?.id}`)} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                    <BsFillPlayFill size={30} className='text-black'/>
                </div>
                <FavoriteButton movieId={data.id}/>
                <div onClick={handleOpenModal} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
                    <BiChevronDown size={30} className="text-white group-hover/item:text-neutral-300"/>
                </div>
            </div>
            <p className='text-green-400 font-semibold mt-4 '>
                New <span className="text-white" >2025</span>
            </p>
            <div className="flex flex-row mt-4 gap-2 items-center">
                <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
            </div>
            <div className="flex flex-row mt-4 gap-2 items-center">
                <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
            </div>
        </div>
        </div>
    </div>
)
}

export default MovieCard
