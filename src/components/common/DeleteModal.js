import React, { useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Portal from "../portal";
import { FiX } from "react-icons/fi";



const ModalDelete = ({ deleteOpen, setDeleteOpen, children }) => {
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
      if (!deleteOpen || modalRef.current.contains(event.target)) {
        return false;
      }
      setDeleteOpen(!deleteOpen);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteOpen, modalRef, setDeleteOpen]);

  return (
    <>
      {deleteOpen && (
        <Portal selector="#portal">
          <div className="modal-backdrop fade-in"></div>
          <div
            className={`modal show ${background === "dark" ? "dark-mode" : ""}`}
            data-background={background}
          >
            <div
              className="relative min-w-sm w-auto mx-auto lg:max-w-5xl"
              ref={modalRef}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    className="modal-close btn btn-transparent"
                    onClick={() => setDeleteOpen(false)}
                  >
                    <FiX size={18} className="stroke-current" />
                  </button>
                </div>
                <div className="relative p-4 flex-auto">
                  <p>Are you sure you want to delete?</p>
                </div>
                <div className="modal-footer space-x-2">{children}</div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default ModalDelete;
