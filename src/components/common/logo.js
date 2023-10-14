import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

const Logo = ({ icon, styles }) => {
  const { config } = useSelector(
    (state) => ({
      config: state.config,
    }),
    shallowEqual
  );
  const { name } = { ...config };
  return (
    <div className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start w-full whitespace-no-wrap text-white">
      <Link
        to="/"
        className={`flex flex-row items-center justify-start space-x-2 ${styles}`}
      >
        {icon}
        <span>{name}</span>
      </Link>
    </div>
  );
};

export default Logo;
