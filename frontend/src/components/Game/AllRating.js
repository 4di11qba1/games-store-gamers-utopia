import React, { useState, useEffect } from "react";
import GameRating from "./GameRating";

function AllRating({ windowWidth, rating }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    if (rating) {
      const formattedRatings = rating.map((rate) => ({
        category: rate.title,
        ratingValue: (rate.percent * 0.05).toFixed(1),
      }));
      setRatings(formattedRatings);
    }
  }, [rating]);
  return (
    <div
      style={{
        display: "flex",
        padding: "15px",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "space-between",
      }}
    >
      {ratings.map((rating, index) => {
        return (
          <React.Fragment key={index}>
            <GameRating
              windowWidth={windowWidth}
              key={index}
              category={rating.category}
              ratingValue={rating.ratingValue}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default AllRating;

// const ratings = [
//   {
//     category: "Steam Ratings",
//     ratingValue: "4.6",
//   },
//   {
//     category: "IGN Ratings",
//     ratingValue: "4.9",
//   },
//   {
//     category: "OpenCritic Ratings",
//     ratingValue: "4.7",
//   },
// ];
