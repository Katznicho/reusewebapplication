import React from "react";

export default function Select({
  title,
  children,
  type,
  onChange,
  name,
  value,
  placeholder,
  width,
  onFocus,
  ...others
}) {
  return (
    <div className={`my-0 w-full ${width}`}>
      <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-gray-300">
        {title}
      </label>
      <div className="flex gap-x-2 items-center">
        <select
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          onFocus={onFocus}
          {...others}
          className="bg-white border border-gray-[#e2e8f0] p-4.5 text-gray-900 text-sm rounded-md h-10  block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-blue-500 placeholder-slate-400 "
        >
          {children}
        </select>
      </div>
    </div>
  );
}
