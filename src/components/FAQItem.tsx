"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        className="w-full text-left p-4 text-xl font-medium bg-gray-800 text-white flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen && <IoMdClose size={24} />}
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-900 text-gray-300">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;

