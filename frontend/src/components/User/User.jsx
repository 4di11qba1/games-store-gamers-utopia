import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { Button } from "@mui/material";
const User = ({ person }) => {
  const publicFolder = "http://localhost:5001/images/";
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture !== ""
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <Button
        variant="contained"
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default User;
