import React from "react";
import "./CircularRating.css";
import { Typography } from "@mui/material";

function CircularRating({ windowWidth, category, ratingValue }) {
  const ratingStyle = {
    "--value": parseInt(ratingValue),
  };

  return (
    <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
      <Typography component="div" variant="h4">
        {category}
      </Typography>
      <div
        role="progressbar"
        aria-valuenow={ratingValue}
        aria-valuemin="0"
        aria-valuemax="100"
        style={ratingStyle}
      ></div>
    </div>
  );
}

export default CircularRating;
