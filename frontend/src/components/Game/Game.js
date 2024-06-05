import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import GameAbout from "./GameAbout";
import GameHead from "./GameHead";
import Popular from "../Popular";
import AllRating from "./AllRating";
import CircularRating from "./CircularRating/CircularRating";
import { getGameDetails, getGameListByGenre } from "../../api/GameRequests";
import scrapeGame from "../../api/ScrapeRequests";
import HorizontalCard from "../HorizontalCard";
import { Skeleton } from "@mui/material";

function Game({ windowWidth }) {
  const { gameID } = useParams();
  const theme = useTheme();
  const [game, setGame] = useState({});
  const [recommended, setRecommended] = useState([]);
  const [tempItems, setTempItems] = useState([]);
  const [tempPrices, setTempPrices] = useState([]);
  const [scrapedGames, setScrapedGames] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getGame = async () => {
      try {
        const res = await getGameDetails(gameID);
        if (!isMounted) return;

        const temp = {
          slug: res.data.slug,
          gameID: res.data.id,
          img: res.data.background_image,
          img2: res.data.background_image_additional,
          title: res.data.name,
          desc: (() => {
            const descIndex = res.data.description_raw.indexOf("Español");
            return descIndex !== -1
              ? res.data.description_raw.substring(0, descIndex).trim()
              : res.data.description_raw.trim();
          })(),
          price: "$44.99",
          genres: res.data.genres.length > 0 ? res.data.genres : [], // Handle empty genre array
          rating: res.data.metacritic,
          release: res.data.released,
          dev: res.data.developers[0].name,
          pub: res.data.publishers[0].name,
          allratings: res.data.ratings,
          review: parseInt((res.data.rating * 20).toFixed(0)),
          requirements: (() => {
            const pcPlatform = res.data.platforms.find(
              (item) => item.platform.name === "PC"
            );
            return {
              minimum:
                pcPlatform && pcPlatform.requirements
                  ? pcPlatform.requirements.minimum
                  : "Not available",
              recommended:
                pcPlatform && pcPlatform.requirements
                  ? pcPlatform.requirements.recommended
                  : "Not available",
            };
          })(),
        };
        setGame(temp);
        getPrices(temp.title);
      } catch (error) {
        console.error("Failed to fetch game details:", error);
      }
    };

    const getPrices = async (name) => {
      try {
        const psPrices = await scrapeGame(name, "playstation");
        const xbxPrices = await scrapeGame(name, "xbox");
        setTempPrices([psPrices, xbxPrices]);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      }
    };

    getGame();

    return () => {
      isMounted = false;
    };
  }, [gameID]);

  useEffect(() => {
    let isMounted = true;

    const getRecommendations = async () => {
      try {
        if (game.genres && game.genres.length > 0) {
          const res = await getGameListByGenre(game.genres);
          if (isMounted) {
            setTempItems(res.data.results);
          }
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      }
    };

    if (game.genres && game.genres.length > 0) {
      getRecommendations();
    }

    return () => {
      isMounted = false;
    };
  }, [game]);

  useEffect(() => {
    if (tempItems.length > 0) {
      const temp = tempItems.slice(0, 5).map((item) => ({
        gameID: item.id,
        slug: item.slug,
        img: item.background_image,
        title: item.name,
        desc: `Released on ${item.released}, ${item.name} is a ${item.genres[0].name} game.`,
        price: "$44.99",
        genres: item.genres.length > 0 ? item.genres : [], // Handle empty genre array
        rating: item.rating,
      }));
      setRecommended(temp);
    }
  }, [tempItems]);

  useEffect(() => {
    if (tempPrices && tempPrices.length > 0) {
      const xboxGame = tempPrices[1].data.slice(0, 10); // Assuming Xbox prices are stored at index 1
      const psGame = tempPrices[0].data.slice(0, 10); // Assuming PlayStation prices are stored at index 0
      setScrapedGames([xboxGame, psGame]);
    }
  }, [tempPrices]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "100%",
        padding: "15px",
        paddingLeft: "80px",
      }}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <GameHead windowWidth={windowWidth} game={game} />

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexDirection: windowWidth < 700 && "column",
        }}
      >
        <GameAbout windowWidth={windowWidth} about={game.desc} />
      </div>

      {scrapedGames.length === 0 ? (
        <div>
          <Typography
            variant="h3"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            Getting Prices
          </Typography>
          <Skeleton variant="rectangular" width={"100%"} height={"50vh"} />
        </div>
      ) : (
        Array.isArray(scrapedGames[0]) &&
        Array.isArray(scrapedGames[1]) && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              gap: "15px",
            }}
          >
            <>
              {scrapedGames.map((game, index) => (
                <div
                  key={`outer-${index}`}
                  style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column",
                  }}
                >
                  <Divider flexItem />
                  <Typography
                    variant="h4"
                    style={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {index === 0 ? "Xbox" : "PlayStation"} Game Deals
                  </Typography>
                  <Divider flexItem />
                  <div
                    style={{
                      maxHeight: "600px",
                      overflowY: "scroll",
                    }}
                  >
                    {game.map((gItem, innerIndex) => (
                      <HorizontalCard
                        windowWidth={windowWidth}
                        key={`inner-${index}-${innerIndex}`}
                        item={gItem}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </>
          </div>
        )
      )}

      <Divider flexItem />
      <Typography component="div" variant="h4" textAlign={"center"}>
        Rating
      </Typography>
      <Divider flexItem />
      <AllRating windowWidth={windowWidth} rating={game.allratings} />
      <div style={{ display: "flex", padding: "15px", flexWrap: "wrap" }}>
        <CircularRating
          windowWidth={windowWidth}
          category={"Metacritic"}
          ratingValue={game.rating}
        />
        <CircularRating
          windowWidth={windowWidth}
          category={"Overall Ratings"}
          ratingValue={game.review}
        />
      </div>

      <Divider flexItem />
      <Typography component="div" variant="h4" textAlign={"center"}>
        System Requirements
      </Typography>
      <Divider flexItem />
      {/* {game && game.requirements ? (
        <GameRequirements
          windowWidth={windowWidth}
          requirements={game.requirements}
        />
      ) : (
        <h1>System Requirements Not Available</h1>
      )} */}
      <Typography component={"div"} variant="p" sx={{ textAlign: "center" }}>
        {game && game.requirements && game.requirements.minimum
          ? game.requirements.minimum
          : "No Minimum Requirements Found"}
      </Typography>
      <Typography component={"div"} variant="p" sx={{ textAlign: "center" }}>
        {game && game.requirements && game.requirements.recommended
          ? game.requirements.recommended
          : "No Recommended Requirements Found"}
      </Typography>

      <Divider flexItem />
      <Typography component="div" variant="h4" textAlign={"center"}>
        More Like This
      </Typography>
      <Divider flexItem />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {recommended.map((item, index) => {
          return <Popular key={index} item={item} />;
        })}
      </div>
    </Box>
  );
}

export default Game;
