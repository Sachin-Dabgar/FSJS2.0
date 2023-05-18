import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button
      className="bg-[#312d2d] text-white font-[600] py-2 px-6 my-10 rounded hover:bg-[#2c2a2a]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
