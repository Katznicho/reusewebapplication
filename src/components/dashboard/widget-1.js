import React from "react";
import { FaArrowDown } from "react-icons/fa";

const Widget1 = ({
  title,
  description,
  details,
  icon,
  right = null,
  color,
}) => {
  return (
    <div className="cursor-pointer flex flex-col">
      <div
        className={`w-full p-4 rounded-tl-lg rounded-tr-lg border ${color} border-grey-100 dark:bg-grey-895 dark:border-grey-890`}
      >
        <div className="flex flex-row ">
          <div className="flex flex-col">
            <div className="text-xs uppercase font-light text-white">
              {title}
            </div>
            <div className="text-xl text-white font-bold">{description}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white p-4 border-grey-700 dark:bg-grey-895 dark:border-grey-890">
        <div>View Details</div>
        <div>
          <FaArrowDown size={20} />
        </div>
      </div>
    </div>
  );
};

export default Widget1;
