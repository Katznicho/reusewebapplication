import React from "react";

export default function Section({
  title,
  description,
  children,
  icon,
  documentData,
}) {
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <div className="flex gap-4 items-center justify-between">
        {icon && (
          <div className="w-12 h-12 p-4 bg-white shadow-md rounded-sm flex items-center justify-center">
            {icon && icon}
          </div>
        )}
        <div className="flex flex-col">
          <h6 className="font-bold text-2xl">{title && title}</h6>
          <div className="text-sm font-bold text-tunziyellow">
            {description && description}
          </div>
        </div>
        <div>{documentData}</div>
      </div>

      {children && children}
    </div>
  );
}
