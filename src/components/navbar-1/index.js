import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { FiMenu } from "react-icons/fi";
import Dropdown5 from "./dropdown-5";
import "../../css/components/navbar.css";

const Navbar = () => {
  const { config, firebase } = useSelector(
    (state) => ({
      config: state.config,
      firebase: state.firebase,
    }),
    shallowEqual
  );
  const { userInfo, isAuthenticated } = { ...firebase };

  let { rightSidebar, collapsed } = { ...config };
  const dispatch = useDispatch();

  return (
    <div className="navbar navbar-1 border-b">
      <div className="navbar-inner w-full flex items-center justify-start">
        <button
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "collapsed",
              value: !collapsed,
            })
          }
          className="mx-4"
        >
          <FiMenu size={20} />
        </button>
        <span className="ml-auto"></span>
        {userInfo !== null && userInfo !== undefined ? (
          <span>{userInfo?.firstName + " " + userInfo?.lastName}</span>
        ) : null}
        <Dropdown5 active={isAuthenticated} userInfo={userInfo} />
        <span className="flex items-center justify-center h-16 w-4 mx-4" />
      </div>
    </div>
  );
};

export default Navbar;
