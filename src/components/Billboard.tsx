"use client"; 

import useBillboard from '@/hooks/useBillboard';
import useInfoModal from '@/hooks/useInfoModal';
import React, { useCallback } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './PlayButton';

const Billboard = () => {
    const { data } = useBillboard();
    const { openModal } = useInfoModal();

    const handleOpenModal = useCallback(() => {
        if (data?.id) {
            openModal(data.id);
        }
    }, [openModal, data?.id]);

    return (
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
            <video
                className="w-full h-full object-cover brightness-[60%]"
                autoPlay
                muted
                loop
                poster={data?.thumbnailUrl}
                src={data?.videoUrl}
            ></video>
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl">
                    {data?.title}
                </p>
                <p className="text-white text-sm md:text-lg mt-3 md:mt-7 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {data?.description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton movieId={data?.id} />
                    <button
                        onClick={handleOpenModal}
                        className="bg-white bg-opacity-[30%] px-2 md:px-4 text-xs lg:text-lg font-semibold flex items-center gap-1 transition-all duration-300 rounded-md py-1 md:py-2 hover:bg-red-600 text-black"
                    >
                        <AiOutlineInfoCircle className="text-lg" />
                        More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Billboard;

