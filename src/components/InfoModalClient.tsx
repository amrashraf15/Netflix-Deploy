"use client";
import React from 'react'
import useInfoModal from "@/hooks/useInfoModal";
import InfoModal from './InfoModal';

const InfoModalClient = () => {
    const{isOpen,closeModal}=useInfoModal();
  return (
    <div>
      <InfoModal visible={isOpen} onClose={closeModal}/>
    </div>
  )
}

export default InfoModalClient
