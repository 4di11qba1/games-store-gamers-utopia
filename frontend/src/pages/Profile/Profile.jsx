import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
const Profile = () => {
  const theme = useTheme();
  return (
    <Box className="Profile" sx={{backgroundColor: theme.palette.background.default, marginLeft: '64px'}}>
      <ProfileLeft />
      <div className="Profile-center">
        <ProfileCard location = 'profilePage'/>
      <PostSide/>
      </div>
      <RightSide/>
    </Box>
  );
};

export default Profile;
