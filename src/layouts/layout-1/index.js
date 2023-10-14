import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Loader from "../../components/loader";
import LeftSidebar1 from "../../components/left-sidebar-1";
import RightSidebar1 from "../../components/right-sidebar-1";
import Navbar1 from "../../components/navbar-1";
import "../../css/layouts/layout-1.css";
import Notification from "../../components/common/Notification";
import { clearMessage, createMessage } from "../../actions/firebaseAction";

const Layout1 = ({ children }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [customMessage, setCustomMessage] = React.useState();
  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.auth,
    }),
    shallowEqual
  );

  const { layout, collapsed } = { ...config };
  let { background, navbar, logo, leftSidebar, rightSidebar } = {
    ...palettes,
  };

  const { message, reason } = { ...auth };
  let msg;
  React.useEffect(() => {
    if (window.localStorage.getItem("first_time_login")) {
      msg = "You are logged in successfully";
    }
    dispatch(createMessage(msg, "user_logged_in"));
  }, [dispatch]);

  React.useEffect(() => {
    if (customMessage !== null || customMessage !== undefined) {
      setCustomMessage(message);
      setOpen(true);
    } else {
      setCustomMessage(null);
      setOpen(false);
    }
  }, [customMessage, message, setCustomMessage]);

  return (
    <div
      data-layout={layout}
      data-collapsed={collapsed}
      data-background={background}
      data-navbar={navbar}
      data-logo={logo}
      data-left-sidebar={leftSidebar}
      data-right-sidebar={rightSidebar}
      className={`${background === "dark" ? "dark-mode" : "default-mode"}`}
    >
      <Loader />
      <RightSidebar1 />
      <div className="wrapper">
        {customMessage && reason === "user_logged_in" ? (
          <Notification
            open={open}
            setOpen={setOpen}
            outerClassNames="z-50 transform fixed bottom-0 left-0 h-auto w-96 p-4"
            innerClassNames="bg-green-500 text-white"
            animation="animate__animated animate__fadeInLeft"
            content={message}
            onClick={() => {
              dispatch(clearMessage());
              localStorage.removeItem("first_time_login");
            }}
          />
        ) : null}
        <LeftSidebar1 />
        <div className="main w-full bg-grey-50 text-grey-900 dark:bg-grey-900 dark:text-white">
          <Navbar1 />
          <div className="min-h-screen w-full p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout1;
