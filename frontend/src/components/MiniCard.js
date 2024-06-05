import { Card, CardMedia, ListItemText } from "@mui/material";
import { Star } from "@mui/icons-material";
import React from "react";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MiniCard({ item }) {
  const theme = useTheme();
  const nav = useNavigate();
  return (
    <Card
      className="hoverableElement"
      onClick={() => nav(`/game/${item.gameID}`)}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexGrow: 1,
        padding: "15px",
        borderRadius: "5px",
        width: "400px",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", gap: "15px" }}>
        <CardMedia
          component="img"
          alt={item.title}
          image={item.img}
          sx={{ width: "100px", height: "100px", borderRadius: "15px" }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
          <ListItemText primary={item.title} secondary={item.rating} />
          <Star
            sx={{
              transform: "translate(22px, -52.25px)",
              width: "15px",
              height: "15px",
            }}
          />
          <div style={{ position: "absolute", bottom: "15px", right: "15px" }}>
            <p
              style={{
                fontSize: "10px",
                backgroundColor: theme.palette.background.paper,
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              {item.genre}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MiniCard;
