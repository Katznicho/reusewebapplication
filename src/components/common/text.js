import React from "react";
import { useSelector, shallowEqual } from "react-redux";

const Text = () => {
  const { config } = useSelector(
    (state) => ({
      config: state.config,
    }),
    shallowEqual
  );
  let { name } = { ...config };
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold mb-4">Welcome to {name}!</p>
      <p className="text-sm font-thin">
        Reuse web application is the administration part of the application
        that enables super admin users to monitor and administer proper usage of
        the application
      </p>
    </div>
  );
};
export default Text;
