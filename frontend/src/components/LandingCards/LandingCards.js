import React, { useState, useEffect, useRef } from "react";
import { Pagination as MuiPagination } from "@mui/material";
import "./LandingCards.css";
import MyButton from "../MyButton/MyButton";
import { useNavigate } from "react-router-dom";

function LandingCards({ itemData, windowWidth }) {
  const [checkedIndex, setCheckedIndex] = useState(0);
  const cardRefs = useRef([]);
  const nav = useNavigate();

  const handleInputChange = (index) => {
    setCheckedIndex(index === checkedIndex ? null : index);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     // Automatically select the next element after 3 seconds
  //     setCheckedIndex((prevIndex) => (prevIndex + 1) % itemData.length);
  //   }, 5000);

  //   return () => clearInterval(timer); // Clear the interval on component unmount
  // }, [itemData.length]);

  useEffect(() => {
    if (cardRefs.current[checkedIndex]) {
      cardRefs.current[checkedIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
        // inline: 'center',
      });
    }
  }, [checkedIndex]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="lc-wrapper">
        <div className="lc-container">
          {itemData.map((item, index) => (
            <React.Fragment key={index}>
              <input
                className="lc-input"
                type="radio"
                name="slide"
                id={`c${index + 1}`}
                checked={index === checkedIndex}
                onChange={() => handleInputChange(index)}
              />
              <label
                ref={(ref) => (cardRefs.current[index] = ref)}
                className="lc-label lc-card"
                htmlFor={`c${index + 1}`}
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundPosition: "center",
                }}
              >
                <div className="lc-row">
                  <div className="lc-description">
                    <h1>{item.title}</h1>
                    <p>{item.genre}</p>
                  </div>
                  <div className="lc-icon">
                    <MyButton
                      bgColor={item.bgColor}
                      text={"See More"}
                      w={"200px"}
                      h={"50px"}
                      onClick={() => nav("/game/" + item.gameID)}
                    />
                  </div>
                </div>
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <CustomPagination
        count={itemData.length}
        checkedIndex={checkedIndex}
        setIndex={setCheckedIndex}
      />
    </div>
  );
}

function CustomPagination({ count, checkedIndex, setIndex }) {
  const handleChange = (event, value) => {
    setIndex(value - 1); // Adjusting to zero-based index
  };

  return (
    <MuiPagination
      count={count}
      page={checkedIndex + 1}
      onChange={handleChange}
      size="small"
      sx={{ transform: "translateY(-35px)" }}
    />
  );
}

export default LandingCards;
