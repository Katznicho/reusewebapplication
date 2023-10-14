import React from "react";

export default function Profile({ children }) {
  return <div className="w-full md:grid md:grid-cols-3 md:gap-6">{children}</div>;
}
