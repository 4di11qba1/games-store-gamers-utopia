import React from "react";
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material';
import { IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';

const NavIcons = () => {
  const theme = useTheme();
  return (
    <>
      <div>
        <Link to="../home">
          <IconButton><PeopleIcon sx={{color: theme.palette.text.primary}} /></IconButton>
        </Link>
      </div>
      <div>
        <Link to="../chat">
          <IconButton><ChatIcon sx={{color: theme.palette.text.primary}} /></IconButton>
        </Link>
      </div>
    </>
  );
};

export default NavIcons;
