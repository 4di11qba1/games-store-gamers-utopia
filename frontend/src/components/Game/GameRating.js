import * as React from "react";
import Rating from "@mui/material/Rating";
import { Stack, Typography } from "@mui/material";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function GameRating({ category, ratingValue }) {
  return (
    <Stack spacing={1} sx={{ flexGrow: 1, flexBasis: "200px" }}>
      <Typography component="div" variant="h5">
        {capitalizeFirstLetter(category)}
      </Typography>

      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Rating
          name="half-rating-read"
          defaultValue={parseInt(ratingValue)}
          precision={0.1}
          readOnly
        />
        <Typography component="div" variant="h6">
          {ratingValue}
        </Typography>
      </div>
    </Stack>
  );
}
