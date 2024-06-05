import React, { useState } from "react";
import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import { Button } from "@mui/material";
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      {/* TrendCard */}
      <TrendCard />

      {/* Share buttong */}
      <Button variant="contained" onClick={() => setModalOpened(true)}>
        Share
      </Button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
