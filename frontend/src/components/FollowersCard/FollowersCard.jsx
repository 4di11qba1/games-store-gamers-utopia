import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const theme = useTheme();

  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted

    const fetchPersons = async () => {
      try {
        const { data } = await getAllUser();
        if (isMounted) {
          setPersons(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchPersons();

    // Cleanup function to unsubscribe or cancel any async tasks
    return () => {
      isMounted = false; // Set the flag to false when component unmounts
    };
  }, []);

  return (
    <div
      className="FollowersCard"
      style={{ color: theme.palette.primary.text }}
    >
      <h3>People you may know</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
        else return null;
      })}
      {!location ? (
        <Button variant="contained">
          <span onClick={() => setModalOpened(true)}>Show more</span>
        </Button>
      ) : (
        ""
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;
