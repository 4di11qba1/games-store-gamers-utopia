import React from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
const Home = () => {
  const theme = useTheme();
  return (
    <>
      <Box className="Home" sx={{backgroundColor: theme.palette.background.default, marginLeft: '64px'}}>
        <ProfileSide/>
        <PostSide />
        <RightSide />
      </Box>
    </>
  );
};

export default Home;
