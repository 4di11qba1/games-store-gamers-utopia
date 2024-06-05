import { Card, CardMedia, Typography } from "@mui/material";
import React from "react";
import MyButton from "./MyButton/MyButton";

function HorizontalCard({ item, width }) {
  return (
    <Card
      className="hoverableElement"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: width && width,
        flexGrow: !width && "1",
        marginTop: "15px",
        borderRadius: "10px",
        position: "relative",
        backgroundImage: `url(${item.image_url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        textShadow: "4px 4px 8px #000000",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backdropFilter: "blur(5px)",
          padding: "15px",
        }}
      >
        <div style={{ display: "flex", gap: "15px" }}>
          <CardMedia
            component="img"
            alt={item.name}
            image={item.image_url}
            sx={{ width: "300px", height: "200px", borderRadius: "15px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "200px",
              padding: "25px",
            }}
          >
            <Typography
              style={{ color: "#ffffff", fontWeight: "bold" }}
              component={"div"}
              variant="h6"
            >
              {item.name}
            </Typography>
            <div
              style={{ position: "absolute", bottom: "40px", right: "40px" }}
            >
              <MyButton
                text={item.price}
                bgColor="rgb(255, 70, 85)"
                w={"150px"}
                h={"50px"}
                onClick={() => window.open(item.link, "_blank")}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default HorizontalCard;
