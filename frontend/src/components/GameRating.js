import * as React from "react";
import Rating from "@mui/material/Rating";
import { Stack, Typography } from "@mui/material";

export default function GameRating({ category, ratingValue, color }) {
  const ratingNumber = parseFloat(ratingValue).toFixed(1);
  return (
    <Stack spacing={1} sx={{ flexGrow: 1, flexBasis: "200px" }}>
      <Typography component="div" variant="h5" sx={{ color: color }}>
        {category}
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
          color: color,
        }}
      >
        <Rating
          name="half-rating-read"
          defaultValue={parseFloat(ratingNumber)}
          precision={0.1}
          readOnly
        />
        <Typography component="div" variant="h6" sx={{ color: color }}>
          {ratingNumber}
        </Typography>
      </div>
    </Stack>
  );
}
