import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

function GameHead({ windowWidth, game }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: windowWidth < 700 && "column",
        gap: "25px",
        padding: "25px",
        borderRadius: "15px",
        transition: "all 1s",
      }}
    >
      {!game.img ? (
        <Skeleton
          variant="rectangular"
          width={windowWidth < 700 ? "100%" : "65vw"}
          height={"100%"}
        />
      ) : (
        <CardMedia
          component="img"
          sx={{
            width: windowWidth < 700 ? "100%" : "65vw",
            borderRadius: "15px",
          }}
          image={game.img}
          alt={game.title}
        />
      )}

      <CardContent
        sx={{
          gap: "15px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {!game.img2 ? (
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        ) : (
          <CardMedia
            component="img"
            sx={{ width: "100%", borderRadius: "15px" }}
            image={game.img2}
            alt={game.title}
          />
        )}

        <Typography component="div" variant="h5">
          {game.title}
        </Typography>
        <Typography
          component="div"
          variant="p"
          minHeight={"120px"}
          sx={{ textAlign: "center", textJustify: "center" }}
        >
          {game && game.desc && game.desc.slice(0, 200)}
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography component="div" variant="p" fontWeight={"bold"}>
              Metacritic:
            </Typography>
            <Typography component="div" variant="p" fontWeight={"bold"}>
              Release Date:
            </Typography>
            <Typography component="div" variant="p" fontWeight={"bold"}>
              Developer:
            </Typography>
            <Typography component="div" variant="p" fontWeight={"bold"}>
              Publisher:
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography component="div" variant="p">
              {game.rating}
            </Typography>
            <Typography component="div" variant="p">
              {game.release}
            </Typography>
            <Typography component="div" variant="p">
              {game.dev}
            </Typography>
            <Typography component="div" variant="p">
              {game.pub}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GameHead;
