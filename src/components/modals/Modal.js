import React, { useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Portal from "../portal";

const Modal = ({ title, icon, open, setOpen, children, width }) => {
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
      console.log(modalRef.current.contains(event.target));
      if (!open || modalRef.current.contains(event.target)) {
        return false;
      }
      setOpen(!open);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, modalRef]);

  return (
    <>
      {open && (
        <Portal selector="#portal">
          <div className="modal-backdrop fade-in"></div>
          <div
            className={`modal show ${
              background === "dark" ? "dark-mode" : ""
            } `}
            data-background={background}
          >
            <div
              className={`relative w-full lg:my-4 mx-auto lg:max-w-lg max-w-sm ${width}`}
              ref={modalRef}
            >
              <div
                className={`bg-white text-grey-900 border-grey-200 dark:bg-grey-800 dark:text-white dark:border-grey-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none`}
              >
                <div className="relative p-4 flex-auto">
                  <div className="flex items-center justify-between w-full py-2">
                    <div className="text-lg mb-2 font-bold">{title}</div>
                    <div
                      className="flex-shrink-0 w-12 cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      {icon}
                    </div>
                  </div>

                  <div className="sm:columns-1 md:columns-2 gap-x-8">
                    {children}
                  </div>
                </div>
                <div className="flex items-center justify-end px-4 py-2 border-t border-grey-200 dark:border-grey-700 border-solid rounded-b space-x-2">
                  <button
                    className="btn btn-default btn-rounded bg-red-500 hover:bg-red-600 text-grey-900"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-default btn-rounded bg-green-500 hover:bg-blue-600 text-grey-900"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Modal;
