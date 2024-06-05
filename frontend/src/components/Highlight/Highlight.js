import React from "react";
import "./Highlight.css";
import { Typography } from "@mui/material";
import MyButton from "../MyButton/MyButton";
import { useNavigate } from "react-router-dom";

function Highlight({ item, img, title, desc, btnText, path }) {
  const itemShow = {
    img: item ? item.img : img,
    title: item ? item.title : title,
    desc: item ? item.desc : desc,
    bgColor: item && item.bgColor,
  };
  const nav = useNavigate();
  return (
    <div
      className="highlight"
      style={{ backgroundImage: `url(${itemShow.img})` }}
    >
      <div className="highlight-content">
        <Typography component="div" variant="h3">
          {itemShow.title}
        </Typography>
        <Typography component="div" variant="p">
          {itemShow.desc}
        </Typography>
        <MyButton
          bgColor={itemShow.bgColor}
          text={btnText}
          w={"300px"}
          h={"50px"}
          path={path}
          onClick={() => nav(`/game/${item.gameID}`)}
        />
      </div>
    </div>
  );
}

export default Highlight;
