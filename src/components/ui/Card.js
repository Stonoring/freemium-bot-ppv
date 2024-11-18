// src/components/ui/Card.js
import React from 'react';

const Card = ({ children, className = "" }) => {
  return (
    <div className={`p-4 bg-[#1E1E1E] border-2 border-[#333333] rounded-lg text-white overflow-hidden text-left text-xl ${className}`} style={{ fontFamily: 'Poppins' }}>
      {children}
    </div>
  );
};

export default Card;
