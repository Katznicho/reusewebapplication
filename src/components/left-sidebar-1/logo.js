import React from "react";
import {FiBox, FiMenu} from "react-icons/fi";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {Link} from "react-router-dom";
import logo from "../../assets/images/tunzi_logo.png";

const Logo = () => {
    const dispatch = useDispatch();
    const {config, leftSidebar} = useSelector(
        (state) => ({
            config: state.config,
            leftSidebar: state.leftSidebar,
        }),
        shallowEqual
    );
    const {name, collapsed} = {...config};
    const {showLogo} = {...leftSidebar};
    if (showLogo) {
        return (
            <div className="logo truncate flex w-full items-center justify-center">
                <Link to="/">
                    <img
                        src={logo}
                        alt="Tunzi logo"
                        className={`object-cover overflow-visible ${
                            collapsed && "object-cover w-5/6 h-5/6"
                        }`}
                    />
                </Link>

                <button
                    onClick={() =>
                        dispatch({
                            type: 'SET_CONFIG_KEY',
                            key: 'collapsed',
                            value: !collapsed
                        })
                    }
                    className="ml-auto mr-4 block lg:hidden">
                    <FiMenu size={20}/>
                </button>
            </div>
        );
    }
    return null;
};

export default Logo;
