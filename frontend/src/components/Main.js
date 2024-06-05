import React, { useEffect, useState } from "react";
import { ArrowForward } from "@mui/icons-material";
import { Typography, IconButton, Card } from "@mui/material";
import LandingCards from "./LandingCards/LandingCards";
import MiniCard from "./MiniCard";
import VerticalCard from "./VerticalCard/VerticalCard";
import BoxCard from "./BoxCard";
import Highlight from "./Highlight/Highlight";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GlobalAPI from "../api/GameRequests";

function Main({ itemData }) {
  const theme = useTheme();
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [temp, setTemp] = useState([]);

  const setTempData = () => {
    const newTemp = items.map((item) => ({
      gameID: item.id,
      slug: item.slug,
      img: item.background_image,
      title: item.name,
      desc: `Released on ${item.released}, ${item.name} is a ${
        item.genres.length > 0 ? item.genres[0].name : "N/A"
      } game.`,
      price: "$44.99",
      genre: item.genres.length > 0 ? item.genres[0].name : "", // Handle empty genre array
      rating: item.metacritic,
      bgColor: "rgb(255, 70, 85)",
      release: item.released,
    }));
    setTemp(newTemp);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await GlobalAPI.getGameList();
        if (isMounted) {
          setItems(res.data.results);
        }
      } catch (error) {
        console.error("Failed to fetch game list:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      setTempData();
    }
  }, [items]);

  const handleNav = (path) => {
    nav(path);
  };
  return (
    <>
      {!items ? (
        <h1>Loading...</h1>
      ) : (
        <Card
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "0px",
            marginLeft: "64px",
            paddingLeft: "15px",
            paddingTop: "12px",
          }}
        >
          <LandingCards itemData={temp.slice(0, 5)} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "99.5%",
              padding: "15px",
            }}
          >
            <Typography variant="h5" component="div">
              Top Choices
            </Typography>
            <IconButton>
              <ArrowForward />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "99.5%",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            {temp.slice(5, 15).map((item, index) => {
              return <MiniCard key={index} item={item} />;
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: "15px",
              marginTop: "15px",
            }}
          >
            <Typography variant="h5" component="div">
              Today's Highlight
            </Typography>
          </div>
          <Highlight
            item={temp[39]}
            btnText={`Let's GO`}
            handleNav={handleNav}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "99.5%",
              padding: "15px",
              marginTop: "15px",
            }}
          >
            <Typography variant="h5" component="div">
              Trending
            </Typography>
            <IconButton>
              <ArrowForward />
            </IconButton>
          </div>
          <div
            className="scrollableElement"
            style={{
              display: "flex",
              width: "94vw",
              alignItems: "center",
              overflowX: "scroll",
              gap: "15px",
            }}
          >
            {temp.slice(15, 25).map((item, index) => {
              return <VerticalCard key={index} item={item} />;
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: "15px",
              marginTop: "15px",
            }}
          >
            <Typography variant="h5" component="div">
              Join Our Community
            </Typography>
          </div>
          <Highlight
            img={"/img/community.jpg"}
            title={"Our Community"}
            desc={
              "Join our community which is in the making and made by the gamers for gamers. All players are welcome no matter what game you play."
            }
            btnText={"Join Community"}
            path={"../home"}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: "15px",
              marginTop: "15px",
            }}
          >
            <Typography variant="h5" component="div">
              Based on your recent activity
            </Typography>
            <IconButton>
              <ArrowForward />
            </IconButton>
          </div>
          <div
            className="scrollableElement"
            style={{
              display: "flex",
              width: "94vw",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            {temp.slice(25, 35).map((item, index) => {
              return <BoxCard key={index} item={item} />;
            })}
          </div>
        </Card>
      )}
    </>
  );
}

export default Main;
