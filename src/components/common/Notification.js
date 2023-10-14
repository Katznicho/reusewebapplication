import React from "react";
import { FiAlertCircle, FiX } from "react-icons/fi";
import Portal from "../portal";
// const positions = [
//   {
//     btnTitle: "on top left corner",
//     btnClassNames: "btn btn-default btn-rounded",
//     outerClassNames: "z-50 transform fixed top-0 left-0 h-auto w-96 p-4",
//     innerClassNames: "bg-red-500 text-white",
//     animation: "animate__animated animate__fadeInLeft",
//     icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
//     content: <span>This is important message!</span>,
//   },
//   {
//     btnTitle: "on top right corner",
//     btnClassNames: "btn btn-default btn-rounded",
//     outerClassNames: "z-50 transform fixed top-0 right-0 h-auto w-96 p-4",
//     innerClassNames: "bg-blue-500 text-white",
//     animation: "animate__animated animate__fadeInRight",
//     icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
//     content: <span>This is important message!</span>,
//   },
//   {
//     btnTitle: "on bottom left corner",
//     btnClassNames: "btn btn-default btn-rounded",
//     outerClassNames: "z-50 transform fixed bottom-0 left-0 h-auto w-96 p-4",
//     innerClassNames: "bg-green-500 text-white",
//     animation: "animate__animated animate__fadeInLeft",
//     icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
//     content: <span>This is important message!</span>,
//   },
//   {
//     btnTitle: "on bottom right corner",
//     btnClassNames: "btn btn-default btn-rounded",
//     outerClassNames: "z-50 transform fixed bottom-0 right-0 h-auto w-96 p-4",
//     innerClassNames: "bg-amber-500 text-white",
//     animation: "animate__animated animate__fadeInRight",
//     icon: <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />,
//     content: <span>This is important message!</span>,
//   },
// ];
export default function Notification({
  outerClassNames,
  innerClassNames,
  animation,
  content,
  open,
  onClick,
}) {
  return (
    <>
      {open && (
        <Portal selector="#portal">
          <div
            className={`rounded-md ${outerClassNames} ${open ? animation : ""}`}
          >
            <div
              className={`w-full flex items-center justify-start p-4 ${innerClassNames}`}
            >
              <div className="flex-shrink">
                <FiAlertCircle className="mr-2 stroke-current h-4 w-4" />
              </div>
              <div className="flex-grow">{content}</div>
              <div className="flex-shrink">
                <button
                  onClick={onClick}
                  className="ml-auto flex items-center justify-center"
                >
                  <FiX className="stroke-current h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
