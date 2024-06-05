import React from "react";
import "./VerticalCard.css";
import { ListItemText } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

function VerticalCard({ item, game }) {
  const nav = useNavigate();
  const theme = useTheme();
  return (
    <div
      className="vertical-card"
      style={{
        backgroundImage: `url(${item ? item?.img : game?.Image})`,
        cursor: "pointer",
      }}
      onClick={() => nav(`/game/${item?.gameID}`)}
    >
      <div className="vertical-card-content">
        <ListItemText
          primary={item ? item?.title : game?.Game}
          secondary={item?.genre}
        />
      </div>
      <div
        className="vertical-card-genre"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        {item?.rating}{" "}
        <Star
          sx={{ width: "12px", height: "12px", transform: "translateY(1.5px)" }}
        />
      </div>
    </div>
  );
}

export default VerticalCard;
