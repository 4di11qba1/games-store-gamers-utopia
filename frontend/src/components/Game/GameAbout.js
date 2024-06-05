import { Card, Typography } from "@mui/material";
import React from "react";

function GameAbout({ about }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        borderRadius: "15px",
        padding: "25px",
      }}
    >
      <Typography component="div" variant="h4">
        About this Game
      </Typography>
      <Typography component="div" variant="p">
        {about}
      </Typography>
    </Card>
  );
}

export default GameAbout;
