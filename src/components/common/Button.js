import React from "react";
import { Link } from "react-router-dom";

export default function Button({ text, onClick, type, bg, icon, styles, to }) {
  return (
    <button
      type={type}
      onClick={onClick && onClick}
      className={`text-white ${bg} transform transition duration-500 hover:scale-105  focus:outline-none font-medium rounded-lg text-sm sm:w-auto px-5 py-2 flex items-center justify-center ${styles} `}
    >
      <Link to={to}>
        <div className="flex space-x-1">
          {icon && icon}
          {text && text}
        </div>
      </Link>
    </button>
  );
}
