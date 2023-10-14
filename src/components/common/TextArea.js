import React from "react";

export default function TextArea({
  name,
  value,
  placeholder,
  rows,
  title,
  width,
  onChange,
  text,
}) {
  return (
    <div className={`${width} my-0`}>
      <label className="block mb-2 text-sm font-small text-gray-900 dark:text-gray-300">
        {title}
      </label>
      <div className="flex gap-x-2 items-center">
        <textarea
          rows={rows}
          className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
