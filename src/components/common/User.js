import React from "react";

export default function User({ image, title, styles }) {
  return (
    <div className={`w-20 h-20 rounded-full ${styles}`}>
      <img src={image} alt={title} className="w-8 h-8 rounded-full" />
    </div>
  );
}
