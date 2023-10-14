import React, { useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Form from "../Form/Form";
import Portal from "../portal";

const Modal = ({ title, icon, open, setOpen, handleSubmit, children }) => {
  const { palettes } = useSelector(
    (state) => ({
      palettes: state.palettes,
    }),
    shallowEqual
  );
  let { background } = {
    ...palettes,
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!modalRef || !modalRef.current) return false;
      if (!open || modalRef.current.contains(event.target)) {
        return false;
      }
      setOpen(!open);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, modalRef, setOpen]);

  return (
    <>
      {open && (
        <Portal selector="#portal">
          <div
            className={`modal show ${background === "dark" ? "dark-mode" : ""}`}
            data-background={background}
          >
            <div
              className="relative w-full lg:my-4 mx-auto lg:max-w-lg max-w-sm"
              ref={modalRef}
            >
              <div className="w-full h-full bg-white text-grey-900 border-grey-200 dark:bg-grey-800 dark:text-white dark:border-grey-700 border-0 rounded-lg shadow-lg relative flex flex-col outline-none">
                <div className="flex flex-col py-2 px-16 border-b border-grey-200 dark:border-grey-700 border-solid">
                  <div className="flex items-center justify-between w-full py-2">
                    <div className="text-lg font-bold">{title}</div>
                    <div
                      className="cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      {icon}
                    </div>
                  </div>
                </div>
                {handleSubmit && (
                  <Form onSubmit={handleSubmit}>
                    <div>{children}</div>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Modal;
