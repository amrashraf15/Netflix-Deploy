"use client"; // 👈 Ensure this is at the top

import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';

interface InfoModalProps {
    visible: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
    const { movieId, closeModal } = useInfoModal();
    const { data } = useMovie(movieId);

    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            closeModal();
            onClose(); // Ensure modal is closed properly
        }, 300);
    }, [closeModal, onClose]);

    if (!visible) return null; // Don't render if not visible

    return (
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md ${isVisible ? "scale-100" : "scale-0"}`}>
                    <div className="relative h-96">
                        <video
                            className="w-full brightness-[60%] object-cover h-full"
                            poster={data?.thumbnailUrl}
                            autoPlay
                            muted
                            loop
                            src={data?.videoUrl}
                        ></video>
                        <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
                            <AiOutlineClose size={20} className="text-white" />
                        </div>
                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-3xl text-white md:text-4xl lg:text-5xl">
                                {data?.title}
                            </p>
                            <div className="flex flex-row gap-4 mt-2 items-center">
                                <PlayButton movieId={data?.id} />
                                <FavoriteButton movieId={data?.id} />
                            </div>
                        </div>
                    </div>
                    <div className="px-12 py-8">
                        <p className="text-green-400 font-semibold text-lg">New</p>
                        <p className="text-white text-lg">{data?.duration}</p>
                        <p className="text-white text-lg">{data?.genre}</p>
                        <p className="text-white text-lg">{data?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;

