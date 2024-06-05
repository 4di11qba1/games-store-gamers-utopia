import React from "react";
import { Dialog, useTheme } from "@mui/material";
import FollowersCard from "../FollowersCard/FollowersCard";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  const theme = useTheme();
  
  return (
    <Dialog
      open={modalOpened}
      onClose={() => setModalOpened(false)}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(4),
          width: "55%",
          borderRadius: '15px'
        }
      }}
    >
      <FollowersCard location='modal'/>
    </Dialog>
  );
};

export default FollowersModal;