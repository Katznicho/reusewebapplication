import React from "react";
import { FiX } from "react-icons/fi";

export const Alert = ({ icon = null, children, error, onClick }) => {
  return (
    <div
      className={`w-full flex items-center justify-start p-3  rounded-md ${error}`}
    >
      <div className="flex-shrink">{icon}</div>
      <div className="flex-grow">{children}</div>
      <div className="flex-shrink">
        <button
          className="ml-auto flex items-center justify-center"
          onClick={onClick}
        >
          <FiX className="stroke-current h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
