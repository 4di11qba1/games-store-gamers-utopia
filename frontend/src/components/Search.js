import React, { useEffect, useState } from "react";
// import { AnimatePresence, motion } from 'framer-motion'
import { Divider, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { Card } from "@mui/material";
import scrapeGame from "../api/ScrapeRequests";
import { useParams } from "react-router-dom";
import HorizontalCard from "./HorizontalCard";
import RecommendRequests from "../api/RecommendRequests";
import { getGameListByGenre } from "../api/GameRequests";
import Popular from "./Popular";
import VerticalCard from "./VerticalCard/VerticalCard";

function Search({ windowWidth }) {
  const theme = useTheme();
  const { searchQuery } = useParams();
  const [psResults, setPSResults] = useState([]);
  const [xbxResults, setXBXResults] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const skeletons = Array.from({ length: 10 });

  useEffect(() => {
    const getResults = async () => {
      if (searchQuery) {
        try {
          const pResults = await scrapeGame(searchQuery, "playstation");
          const xResults = await scrapeGame(searchQuery, "xbox");
          setPSResults(pResults.data.slice(0, 10));
          setXBXResults(xResults.data.slice(0, 10));
        } catch (error) {
          console.error("Failed to fetch recommendations:", error);
        }
      }
    };

    getResults();
  }, []);

  useEffect(() => {
    const getRecommends = async () => {
      if (searchQuery) {
        try {
          const results = await RecommendRequests.recommendGames(searchQuery);
          setRecommends(results.data.recommendations.slice(0, 10));
        } catch (error) {
          console.error("Failed to fetch recommendations:", error);
        }
      }
    };

    getRecommends();
  }, []);

  return (
    <>
      {!recommends ? (
        <Skeleton variant="rectangular" width={"100%"} height={"500px"} />
      ) : (
        <Card
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "0px",
            paddingTop: "10px",
            paddingLeft: "75px",
            paddingRight: "10px",
          }}
        >
          {/* <AnimatePresence>    */}

          <div>
            <Divider flexItem sx={{ marginBottom: "10px" }} />
            <Typography component="div" variant="h4">
              Your Search Results
            </Typography>
            <Divider flexItem sx={{ marginTop: "10px" }} />

            <Typography
              component="div"
              variant="h4"
              sx={{ marginTop: "15px", textAlign: "center" }}
            >
              Playstation Deals
            </Typography>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {psResults.length < 1
                ? skeletons.map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      width="100%"
                      height="300px"
                    />
                  ))
                : psResults.map((item, index) => {
                    return (
                      <HorizontalCard
                        width={windowWidth > 1120 ? "49%" : null}
                        key={index}
                        item={item}
                      />
                    );
                  })}
            </div>

            <Typography
              component="div"
              variant="h5"
              sx={{ marginTop: "15px", textAlign: "center" }}
            >
              XBOX Deals
            </Typography>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {xbxResults.length < 1
                ? skeletons.map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      width="100%"
                      height="300px"
                    />
                  ))
                : xbxResults.map((item, index) => {
                    return (
                      <HorizontalCard
                        width={windowWidth > 1120 ? "49%" : null}
                        key={index}
                        item={item}
                      />
                    );
                  })}
            </div>

            {
              <>
                <Divider
                  flexItem
                  sx={{ marginBottom: "10px", marginTop: "15px" }}
                />
                <Typography component="div" variant="h4">
                  We Recommend You To Also Check These Out
                </Typography>
                <Divider
                  flexItem
                  sx={{ marginTop: "10px", marginBottom: "10px" }}
                />
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
                  {recommends.length < 1
                    ? skeletons.map((_, index) => (
                        <Skeleton
                          key={index}
                          variant="rectangular"
                          width="200px"
                          height="400px"
                        />
                      ))
                    : recommends.map((item, index) => {
                        return <VerticalCard key={index} game={item} />;
                      })}
                </div>
              </>
            }
          </div>

          {/* </AnimatePresence> */}
        </Card>
      )}
    </>
  );
}

export default Search;
