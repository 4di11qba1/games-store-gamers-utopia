import React from "react";
import "./MyButton.css";

function MyButton({ bgColor, text, w, h, path, onClick }) {
  return (
    <button className="my-button" onClick={onClick}>
      <div
        style={{
          backgroundColor: bgColor ? bgColor : "rgb(255, 70, 85)",
          width: w,
          height: h,
        }}
      >
        <span></span>
        <a href={path}>{text}</a>
      </div>
    </button>
  );
}

export default MyButton;
