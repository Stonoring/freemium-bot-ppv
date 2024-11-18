// src/components/ui/PredefinedButton.js
import React from 'react';

const PredefinedButton = ({ label, icon: Icon, onClick }) => (
  <button
    className="flex-1 w-full max-w-xs bg-[#1E1E1E] text-white hover:bg-[#eb3729] rounded-full text-center flex items-center justify-center text-xl py-2 px-4 transition duration-300"
    onClick={onClick}
    style={{ fontFamily: 'Poppins' }}
  >
    <Icon className="mr-2 h-5 w-5" />
    {label}
  </button>
);

export default PredefinedButton;
